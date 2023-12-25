'use client';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';

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
  display: boolean;
  onClose: () => void;
}

export default function OrderEventAddDialog(props: OrderEventAddDialogProps) {
  const [eventType, setEventType] = useState(props.defaultTypeOption);
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState<string | undefined>();

  function onCreateClicked() {
    props.onSubmit({ type: eventType, location, message });
  }

  return (
    <Modal isOpen={props.display} onClose={props.onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add an event for this order</ModalHeader>
        <ModalCloseButton />
        <ModalBody h={200} pb={6}>
          <FormControl>
            <FormLabel>Type:</FormLabel>
            <Select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              {props.typeOptions.map((i) => (
                <option key={i.name} value={i.name}>
                  {i.displayName}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Location:</FormLabel>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Message:</FormLabel>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onCreateClicked} colorScheme="blue" mr={3}>
            Create
          </Button>
          <Button onClick={props.onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
