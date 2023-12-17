'use client';
import {
  Modal,
  FormControl,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import * as React from 'react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';

interface DialogProps {
  paymentDialog: boolean;
  handleClose: () => void;
}

export default function CompletePaymentDialog({ open }: { open: DialogProps }) {
  const { onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={open.paymentDialog}
      onClose={open.handleClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter your Pay Amount</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Pay Amount</FormLabel>
            <Input ref={initialRef} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Confirm
          </Button>
          <Button onClick={open.handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
