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
import { FiEdit, FiPause, FiX } from 'react-icons/fi';
import { object, string } from 'yup';
import { dateToFullFormat } from '../utils/time-formats';
import { DialogProps } from './dialogs';

export interface EventTimelineProps {
  lastId: number;
  children: React.ReactNode;
}

export function EventTimeline(props: EventTimelineProps) {
  return (
    <Stepper orientation="vertical" index={props.lastId + 1} gap={0}>
      {props.children}
    </Stepper>
  );
}

export interface EventUpdateData {
  location?: string;
  message?: string;
}

export interface EventDisplayProp {
  type: string;
  time: Date;
  location?: string;
  message?: string;
  isDisabled?: boolean;
  isInterrupted?: boolean;
  isEndedInError?: boolean;
  isLocationEditDisabled?: boolean;
  onChange: (input: EventUpdateData) => void;
}

export function EventDisplay(props: EventDisplayProp) {
  const [editMode, setEditMode] = useState(false);

  let eventTypeTextColor: string | undefined;
  if (props.isInterrupted) {
    eventTypeTextColor = 'orange';
  } else if (props.isEndedInError) {
    eventTypeTextColor = 'red';
  }

  let indicatorIcon: JSX.Element;
  if (props.isInterrupted) {
    indicatorIcon = <FiPause />;
  } else if (props.isEndedInError) {
    indicatorIcon = <FiX />;
  } else {
    indicatorIcon = <StepIcon />;
  }

  const info = (
    <>
      <Text>{props.location}</Text>
      {props.message && (
        <Text fontWeight="bold" overflowWrap="anywhere">
          {props.message}
        </Text>
      )}
    </>
  );

  const editor = (
    <EventEditor
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
      <StepIndicator padding={0}>
        <StepStatus
          complete={indicatorIcon}
          active={<StepNumber />}
          incomplete={<StepNumber />}
        />
      </StepIndicator>

      <Flex w={600} mb="5">
        <Stack flexGrow={1} spacing={1}>
          <Text color={eventTypeTextColor} fontWeight="bold" fontSize="lg">
            {props.type}
          </Text>
          <Text color="gray.500">{dateToFullFormat(props.time)}</Text>
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

interface EventEditorProps {
  location?: string;
  message?: string;
  isLocationEditDisabled?: boolean;
  onChange: (input: EventUpdateData) => void;
  onEditCancel: () => void;
}

function EventEditor(props: EventEditorProps) {
  const isLocationEditDisabled = props.isLocationEditDisabled;

  const initialFormValues: EventUpdateData = {
    location: isLocationEditDisabled ? undefined : props.location,
    message: props.message,
  };

  const validationWithLocationSchema = object({
    location: string().label('Location').required(),
    message: string().label('Message').nullable(),
  });

  const validationWithoutLocationSchema = object({
    message: string().label('Message').nullable(),
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
          <Stack spacing={3}>
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
                as={Textarea}
                id="message"
                name="message"
                placeholder="Enter an optional custom message..."
              />
              <FormErrorMessage>{errors.message}</FormErrorMessage>
            </FormControl>

            <Button alignSelf="end" type="submit" colorScheme="blue">
              Edit
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  );
}

export interface EventAddDialogTypeOption {
  name: string;
  displayName: string;
}

export interface EventAddDialogResult {
  type: string;
  location: string;
  message?: string;
}

export interface EventAddDialogProps extends DialogProps {
  typeOptions: EventAddDialogTypeOption[];
  onSubmit: (result: EventAddDialogResult) => void;
  defaultTypeOption: string;
}

export function EventAddDialog(props: EventAddDialogProps) {
  const initialFormValues: EventAddDialogResult = {
    type: props.defaultTypeOption,
    location: '',
    message: undefined,
  };

  const formValidationSchema = object({
    type: string().required(),
    location: string().label('Location').required(),
    message: string().label('Message').nullable(),
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
                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={props.isLoading}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}
