'use client';
import React, { useState } from 'react';
import {
  Modal,
  FormControl,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormLabel,
  Textarea,
  ModalFooter,
  Button,
  Input,
  Select,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { Event, EventInput, IEventResponse } from '../types/sales';
import { createSalesEvent } from '../api/salesApi';

interface DialogProps {
  displayEvents: Event[];
  setDisplayEvents: (events: Event[]) => void;
  orderId: string;
  display: boolean;
  setClose: () => void;
}

export default function AddEventDialog(addDialog: DialogProps) {
  const [eventType, setEventType] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const { mutate: createEvent } = useMutation(
    async (eventData: EventInput) =>
      await createSalesEvent(addDialog.orderId, eventData),
    {
      onSuccess: (response: IEventResponse) => {
        const newEvent = new Event(
          response.type,
          `${response.id}`,
          response.location,
          response.message,
          response.time,
          response.isAutomatic,
        );
        addDialog.displayEvents.push(newEvent);
        addDialog.setDisplayEvents(addDialog.displayEvents);
        addDialog.setClose();
      },
    },
  );
  function onCreate(eventType: string, location: string, message: string) {
    const newEvent = new EventInput(eventType, location, message);
    createEvent(newEvent);
  }

  return (
    <Modal isOpen={addDialog.display} onClose={addDialog.setClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add event for this sales order</ModalHeader>
        <ModalCloseButton />
        <ModalBody h={200} pb={6}>
          <FormControl>
            <FormLabel>Event Type:</FormLabel>
            <Select
              value={eventType}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEventType(e.target.value)
              }
            >
              <option value="Left">Left</option>
              <option value="Arrived">Arrived</option>
              <option value="Interrupted">Interrupted</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Location:</FormLabel>
            <Input
              value={location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLocation(e.target.value)
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Message:</FormLabel>
            <Textarea
              value={message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMessage(e.target.value)
              }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => onCreate(eventType, location, message)}
            colorScheme="blue"
            mr={3}
          >
            Save
          </Button>
          <Button onClick={addDialog.setClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
