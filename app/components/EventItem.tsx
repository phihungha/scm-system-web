'use client';
import React, { useState } from 'react';
import {
  Event,
  EventInput,
  IEventResponse,
  UpdateEventInput,
} from '@/app/types/sales';
import {
  Box,
  Step,
  StepIndicator,
  StepStatus,
  Button,
  IconButton,
  StepSeparator,
  StepIcon,
  StepNumber,
  Stack,
  Text,
  Input,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { FiEdit, FiCheck, FiX } from 'react-icons/fi';
import { dateToFullFormat } from '../utils/time-conversion';
import { updateSalesEvent } from '../api/salesApi';
interface EventProps {
  event: Event;
  orderId: string;
}

export default function EventItem({ event, orderId }: EventProps) {
  const eventTime = dateToFullFormat(new Date(event.time));
  const [locationInput, SetLocationInput] = useState(true);
  const [messageInput, SetMessageInput] = useState(true);
  const { mutate: editEvent } = useMutation(
    async (eventData: UpdateEventInput) =>
      await updateSalesEvent(orderId, event.id, eventData),
    {
      onSuccess: (response: IEventResponse) => {
        outEdit();
      },
    },
  );

  function onEdit() {
    if (event.isAutomatic == true) {
      SetMessageInput(false);
    } else {
      SetLocationInput(false);
      SetMessageInput(false);
    }
  }
  function outEdit() {
    SetLocationInput(true);
    SetMessageInput(true);
  }
  function onUpdate(location: string, message: string) {
    const newEvent = new UpdateEventInput(location, message);
    editEvent(newEvent);
  }

  function handleLocationChange(location: string) {
    event.location = location;
  }
  function handleMessageChange(message: string) {
    event.message = message;
  }
  return (
    <Step key={event.id}>
      <StepIndicator>
        <StepStatus
          complete={<StepIcon />}
          incomplete={<StepNumber />}
          active={<StepNumber />}
        />
      </StepIndicator>

      <Box flexShrink="0">
        <Stack spacing={3} direction={'row'}>
          <Stack>
            <Text fontSize="2xl" fontWeight={'bold'}>
              {event.type}
            </Text>
            <Input
              isDisabled={locationInput}
              value={event.location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleLocationChange(e.target.value)
              }
              fontSize="xl"
            ></Input>
            <Input
              isDisabled={messageInput}
              value={event.message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleMessageChange(e.target.value)
              }
              fontSize="xl"
            ></Input>
            <Text fontSize="xl">{eventTime}</Text>
          </Stack>
          <Stack key={event.id} spacing={2}>
            <IconButton
              onClick={() => onEdit()}
              variant="outline"
              colorScheme="blue"
              fontSize="20px"
              icon={<FiEdit />}
            />
            <IconButton
              isDisabled={messageInput}
              onClick={() => onUpdate(event.location, event.message)}
              variant="outline"
              colorScheme="blue"
              fontSize="20px"
              icon={<FiCheck />}
            />
            <IconButton
              isDisabled={messageInput}
              onClick={() => outEdit()}
              variant="outline"
              colorScheme="blue"
              fontSize="20px"
              icon={<FiX />}
            />
          </Stack>
        </Stack>
      </Box>
      <StepSeparator />
    </Step>
  );
}
