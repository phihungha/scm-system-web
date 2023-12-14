'use client';

import { Stepper, useSteps, Text, Stack, Box } from '@chakra-ui/react';
import { EventInput } from '../types/sales';
import EventItem from './EventItem';

const event1 = new EventInput('Start', '123 Ha Phi Hung', 'SE1231231313');
const event2 = new EventInput(
  'Executing',
  '123 Le Quang Trung',
  'SE1231231313',
);
const event3 = new EventInput('Finish', '123 Ha Phi Hung', 'SE1231231313');
const events: EventInput[] = [];
events.push(event1, event2, event3);

export default function EventProgress() {
  const { activeStep } = useSteps({
    index: 1,
    count: events.length,
  });
  return (
    <Stack spacing={2}>
      <Text
        fontSize={{ base: '16px', lg: '20px' }}
        color={'black.500'}
        fontWeight={'bold'}
        textTransform={'uppercase'}
        mb={'4'}
      >
        Progress Details
      </Text>
      <Box>
        <Stepper index={activeStep}>
          {events.map((event, index) => (
            <EventItem event={event} id={index}></EventItem>
          ))}
        </Stepper>
      </Box>
    </Stack>
  );
}
