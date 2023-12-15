'use client';

import {
  Box,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  StepSeparator,
  StepIcon,
  StepNumber,
  Stack,
  Text,
} from '@chakra-ui/react';

interface EventProps {
  type: string;
  location: string;
  message: string;
}

export default function EventItem({
  event,
  id,
}: {
  event: EventProps;
  id: number;
}) {
  return (
    <Step key={id}>
      <StepIndicator>
        <StepStatus
          complete={<StepIcon />}
          incomplete={<StepNumber />}
          active={<StepNumber />}
        />
      </StepIndicator>

      <Box flexShrink="0">
        <Stack>
          <Text fontSize="2xl" fontWeight={'bold'}>
            {event.type}
          </Text>
          <Text fontSize="xl">{event.location}</Text>
          <Text fontSize="xl">{event.message}</Text>
        </Stack>
      </Box>

      <StepSeparator />
    </Step>
  );
}
