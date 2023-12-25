'use client';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { useState } from 'react';
import { FiEdit, FiX } from 'react-icons/fi';
import { object, string } from 'yup';
import { dateToFullFormat } from '../utils/time-formats';
import { ButtonSpinner } from './spinners';

export interface OrderEventTimelineProps {
  lastId: number;
  children: React.ReactNode;
}

export function OrderEventTimeline(props: OrderEventTimelineProps) {
  return (
    <Stepper orientation="vertical" index={props.lastId} gap={0}>
      {props.children}
    </Stepper>
  );
}

export interface OrderEventUpdateData {
  location?: string;
  message?: string;
}

export interface OrderEventDisplayProp {
  type: string;
  time: Date;
  location?: string;
  message?: string;
  isLocationEditDisabled?: boolean;
  isDisabled?: boolean;
  onChange: (input: OrderEventUpdateData) => void;
}

export function OrderEventDisplay(props: OrderEventDisplayProp) {
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

      <Flex w={600} mb="5">
        <Stack flexGrow={1}>
          <Text fontWeight="bold" fontSize="lg">
            {props.type}
          </Text>
          <Text>{dateToFullFormat(props.time)}</Text>
          {editMode ? editor : info}
        </Stack>

        {(!props.isDisabled ?? true) && (
          <IconButton
            aria-label="Accept event edit"
            onClick={() => setEditMode(!editMode)}
            variant="contained"
            colorScheme="blue"
            fontSize="20px"
            icon={editMode ? <FiX /> : <FiEdit />}
          />
        )}
      </Flex>
      <StepSeparator />
    </Step>
  );
}

interface OrderItemEditorProps {
  location?: string;
  message?: string;
  isLocationEditDisabled?: boolean;
  onChange: (input: OrderEventUpdateData) => void;
  onEditCancel: () => void;
}

function OrderItemEditor(props: OrderItemEditorProps) {
  const isLocationEditDisabled = props.isLocationEditDisabled;

  const initialFormValues: OrderEventUpdateData = {
    location: isLocationEditDisabled ? undefined : props.location,
    message: props.message,
  };

  const validationWithLocationSchema = object({
    location: string().required(),
    message: string(),
  });

  const validationWithoutLocationSchema = object({
    message: string(),
  });

  const formValidationSchema = isLocationEditDisabled
    ? validationWithoutLocationSchema
    : validationWithLocationSchema;

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
              {(!props.isLocationEditDisabled ?? true) && (
                <FormControl isInvalid={!!errors.location && touched.location}>
                  <Field
                    as={Input}
                    id="location"
                    name="location"
                    placeholder="Enter location..."
                  />
                  <FormErrorMessage>{errors.location}</FormErrorMessage>
                </FormControl>
              )}

              <FormControl isInvalid={!!errors.message && touched.message}>
                <Field
                  as={Input}
                  id="message"
                  name="message"
                  placeholder="Enter an optional custom message..."
                />
                <FormErrorMessage>{errors.message}</FormErrorMessage>
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

export interface OrderEventAddDialogTypeOption {
  name: string;
  displayName: string;
}

export interface OrderEventAddDialogResult {
  type: string;
  location: string;
  message?: string;
}

export interface OrderEventAddDialogProps {
  typeOptions: OrderEventAddDialogTypeOption[];
  onSubmit: (result: OrderEventAddDialogResult) => void;
  defaultTypeOption: string;
  onClose: () => void;
  display: boolean;
  isLoading?: boolean;
}

export function OrderEventAddDialog(props: OrderEventAddDialogProps) {
  const initialFormValues: OrderEventAddDialogResult = {
    type: props.defaultTypeOption,
    location: '',
    message: undefined,
  };

  const formValidationSchema = object({
    type: string().required(),
    location: string().required(),
    message: string(),
  });

  return (
    <Modal isOpen={props.display} onClose={props.onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add an event for this order.</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={initialFormValues}
          validationSchema={formValidationSchema}
          onSubmit={(i) => props.onSubmit(i)}
        >
          {({ handleSubmit, errors, touched }) => (
            <form method="POST" onSubmit={handleSubmit}>
              <ModalBody>
                <Stack spacing={5}>
                  <FormControl>
                    <FormLabel>Type</FormLabel>
                    <Field as={Select} name="type">
                      {props.typeOptions.map((i) => (
                        <option key={i.name} value={i.name}>
                          {i.displayName}
                        </option>
                      ))}
                    </Field>
                  </FormControl>

                  <FormControl
                    isInvalid={!!errors.location && touched.location}
                  >
                    <FormLabel>Location</FormLabel>
                    <Field as={Input} id="location" name="location" />
                    <FormErrorMessage>{errors.location}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.message && touched.message}>
                    <FormLabel>Message</FormLabel>
                    <Field as={Textarea} id="message" name="message" />
                    <FormErrorMessage>{errors.message}</FormErrorMessage>
                  </FormControl>
                </Stack>
              </ModalBody>

              <ModalFooter>
                <Button mr={3} onClick={props.onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="blue">
                  {props.isLoading ? <ButtonSpinner /> : 'Create'}
                </Button>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}
