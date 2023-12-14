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
        <StepTitle>
          <Text pt={4} fontSize="xl" fontWeight={'bold'}>
            {event.type}
          </Text>
        </StepTitle>
        <StepDescription>
          <Stack spacing={2}>
            <Text fontSize="sm">{event.location}</Text>
            <Text fontSize="sm">{event.message}</Text>
          </Stack>
        </StepDescription>
      </Box>

      <StepSeparator />
    </Step>
  );
}
