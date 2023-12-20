'use client';
import { Event } from '@/app/types/sales';
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
} from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import { dateToFullFormat } from '../utils/time-conversion';
interface EventProps {
  event: Event;
  orderId: string;
}

export default function EventItem({ event }: EventProps) {
  const eventTime = dateToFullFormat(new Date(event.time));
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
            <Text fontSize="xl">{event.location}</Text>
            <Text fontSize="xl">{event.message}</Text>
            <Text fontSize="xl">{eventTime}</Text>
          </Stack>
          <IconButton
            variant="outline"
            colorScheme="blue"
            fontSize="20px"
            icon={<FiEdit />}
          />
        </Stack>
      </Box>
      <StepSeparator />
    </Step>
  );
}
