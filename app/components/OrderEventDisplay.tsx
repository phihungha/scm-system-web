import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Text,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { useState } from 'react';
import { FiEdit, FiX } from 'react-icons/fi';
import { object, string } from 'yup';
import { dateToFullFormat } from '../utils/time-formats';

export interface OrderEventUpdateData {
  location?: string;
  message?: string;
}

export interface OrderEventDisplayProp {
  type: string;
  time: Date;
  location?: string;
  message?: string;
  isLocationEditAllowed?: boolean;
  onChange: (input: OrderEventUpdateData) => void;
}

export default function OrderEventDisplay(props: OrderEventDisplayProp) {
  const [editMode, setEditMode] = useState(false);

  const info = (
    <>
      <Text>{props.location}</Text>
      {props.message && <Text overflowWrap="anywhere">{props.message}</Text>}
    </>
  );

  const editor = (
    <OrderItemEditor
      {...props}
      onEditCancel={() => setEditMode(false)}
      location={props.location ?? ''}
      onChange={(input) => {
        setEditMode(false);
        props.onChange(input);
      }}
    />
  );

  return (
    <Step>
      <StepIndicator>
        <StepStatus
          complete={<StepIcon />}
          incomplete={<StepNumber />}
          active={<StepNumber />}
        />
      </StepIndicator>

      <Flex w={500} mb="5">
        <Stack flexGrow={1}>
          <Text fontWeight="bold" fontSize="lg">
            {props.type}
          </Text>
          <Text>{dateToFullFormat(props.time)}</Text>
          {editMode ? editor : info}
        </Stack>

        <IconButton
          aria-label="Accept event edit"
          onClick={() => setEditMode(!editMode)}
          variant="outline"
          colorScheme="blue"
          fontSize="20px"
          icon={editMode ? <FiX /> : <FiEdit />}
        />
      </Flex>
      <StepSeparator />
    </Step>
  );
}

interface OrderItemEditorProps {
  location?: string;
  message?: string;
  isLocationEditAllowed?: boolean;
  onChange: (input: OrderEventUpdateData) => void;
  onEditCancel: () => void;
}

function OrderItemEditor(props: OrderItemEditorProps) {
  const isLocationEditAllowed = props.isLocationEditAllowed;

  const initialFormValues: OrderEventUpdateData = {
    location: isLocationEditAllowed ? props.location : undefined,
    message: props.message,
  };

  const validationWithLocationSchema = object({
    location: string().required(),
    message: string(),
  });

  const validationWithoutLocationSchema = object({
    message: string(),
  });

  const formValidationSchema = isLocationEditAllowed
    ? validationWithLocationSchema
    : validationWithoutLocationSchema;

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={formValidationSchema}
      onSubmit={props.onChange}
    >
      {({ handleSubmit, errors, touched }) => (
        <form method="POST" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Stack spacing={5}>
              {props.isLocationEditAllowed && (
                <FormControl isInvalid={!!errors.location && touched.location}>
                  <Field
                    as={Input}
                    id="location"
                    name="location"
                    isDisabled={!props.isLocationEditAllowed ?? true}
                    placeholder="Enter location..."
                  />
                  <FormErrorMessage>{errors.location}</FormErrorMessage>
                </FormControl>
              )}

              <FormControl>
                <Field
                  as={Input}
                  id="message"
                  name="message"
                  placeholder="Enter an optional custom message..."
                />
              </FormControl>
            </Stack>

            <Button alignSelf="end" type="submit" colorScheme="blue">
              Edit
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  );
}
