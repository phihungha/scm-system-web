'use client';
import { Modal, FormControl,
    ModalOverlay,ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormLabel, Input,ModalFooter,Button,useDisclosure} from '@chakra-ui/react';
import * as React from 'react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';

interface DialogProps {
  cancelDiaglog: boolean,
CancelClose: () => void;
}

export default function CancelSalesDialog({open} :{open : DialogProps}) {
    const { onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    return (
    <Modal
    initialFocusRef={initialRef}
    finalFocusRef={finalRef}
    isOpen={open.cancelDiaglog}
    onClose={open.CancelClose}
    size={'xl'}
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>You want to cancel this sales order?</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel>Before canceling the sales order, you can your problem here:</FormLabel>
          <Input h='full' ref={initialRef}/>
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3}>
          Save
        </Button>
        <Button onClick={open.CancelClose}>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  );
}
