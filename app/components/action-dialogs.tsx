import {
  Button,
  FormControl,
  FormLabel,
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
import { object, string } from 'yup';

export interface ProblemDialogProps {
  title: string;
  description: string;
  onSubmit: (problem: string) => void;
  display: boolean;
  onClose: () => void;
}

export function ProblemDialog(props: ProblemDialogProps) {
  const initialFormValues = {
    problem: '',
  };

  const formValidationSchema = object({
    problem: string().required(),
  });

  return (
    <Modal isOpen={props.display} onClose={props.onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Formik
            initialValues={initialFormValues}
            validationSchema={formValidationSchema}
            onSubmit={(i) => props.onSubmit(i.problem)}
          >
            {({ handleSubmit, errors, touched }) => (
              <form method="POST" onSubmit={handleSubmit}>
                <FormControl isInvalid={!!errors.problem && touched.problem}>
                  <FormLabel>Problem</FormLabel>
                  <Field as={Textarea} id="problem" name="problem" />
                </FormControl>
              </form>
            )}
          </Formik>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" colorScheme="blue" mr={3}>
            Confirm
          </Button>
          <Button onClick={props.onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
