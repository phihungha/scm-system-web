'use client';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { number, object, string } from 'yup';
import { currencySymbol } from '../utils/currency-formats';
import { DialogProps } from './dialogs';
import { ButtonSpinner } from './spinners';
import { SubtitleText } from './texts';

export interface PaymentCompleteDialogProps extends DialogProps {
  onSubmit: (payAmount: number) => void;
}

export function PaymentCompleteDialog(props: PaymentCompleteDialogProps) {
  const initialFormValues = {
    payAmount: 1000,
  };

  const formValidationSchema = object({
    payAmount: number().label('Pay amount').required().min(1),
  });

  return (
    <Modal isOpen={props.display} onClose={props.onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Complete payment</ModalHeader>
        <ModalCloseButton />

        <Formik
          initialValues={initialFormValues}
          validationSchema={formValidationSchema}
          onSubmit={(i) => props.onSubmit(i.payAmount)}
        >
          {({ handleSubmit, errors, touched }) => (
            <form method="POST" onSubmit={handleSubmit}>
              <ModalBody>
                <SubtitleText mb={5}>
                  Complete payment for this order.
                </SubtitleText>

                <FormControl
                  isInvalid={!!errors.payAmount && touched.payAmount}
                >
                  <FormLabel>Pay amount</FormLabel>

                  <InputGroup>
                    <Field
                      as={Input}
                      placeholder="Enter pay amount..."
                      id="payAmount"
                      name="payAmount"
                    />
                    <InputRightAddon>{currencySymbol}</InputRightAddon>
                  </InputGroup>

                  <FormErrorMessage>{errors.payAmount}</FormErrorMessage>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button mr={3} onClick={props.onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="blue">
                  {props.isLoading ? <ButtonSpinner /> : 'Confirm'}
                </Button>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}

export interface ProblemDialogProps extends DialogProps {
  title: string;
  description: string;
  onSubmit: (problem: string) => void;
}

export function ProblemDialog(props: ProblemDialogProps) {
  const initialFormValues = {
    problem: '',
  };

  const formValidationSchema = object({
    problem: string().label('Problem').required(),
  });

  return (
    <Modal isOpen={props.display} onClose={props.onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalCloseButton />

        <Formik
          initialValues={initialFormValues}
          validationSchema={formValidationSchema}
          onSubmit={(i) => props.onSubmit(i.problem)}
        >
          {({ handleSubmit, errors, touched }) => (
            <form method="POST" onSubmit={handleSubmit}>
              <ModalBody>
                <SubtitleText mb={5}>{props.description}</SubtitleText>

                <FormControl isInvalid={!!errors.problem && touched.problem}>
                  <FormLabel>Problem</FormLabel>
                  <Field
                    as={Textarea}
                    placeholder="Enter problems..."
                    id="problem"
                    name="problem"
                  />
                  <FormErrorMessage>{errors.problem}</FormErrorMessage>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button mr={3} onClick={props.onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="blue">
                  {props.isLoading ? <ButtonSpinner /> : 'Confirm'}
                </Button>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}

export interface OrderProblemDialogProps extends DialogProps {
  onSubmit: (problem: string) => void;
}

export function OrderCancelDialog(props: OrderProblemDialogProps) {
  return (
    <ProblemDialog
      title="Cancel order"
      description="Cancel this order due to problems. This action cannot be undone!"
      {...props}
    />
  );
}

export function OrderReturnDialog(props: OrderProblemDialogProps) {
  return (
    <ProblemDialog
      title="Return order"
      description="Return this order due to problems. This action cannot be undone!"
      {...props}
    />
  );
}
