import {
  createSalesOrderEvent,
  updateSalesOrderEvent,
} from '@/app/api/sales-order';
import { EventTimeline, EventUpdateData } from '@/app/components/events';
import {
  OrderEventDisplayProps,
  OrderEventTimelinePanelProps,
  TransOrderEventAddDialog,
  TransOrderEventDisplay,
} from '@/app/components/order-events';
import { SectionText } from '@/app/components/texts';

import { SalesOrder } from '@/app/models/sales-order';
import { TransOrderEvent } from '@/app/models/trans-order';
import { Button, Stack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation } from 'react-query';

export default function SalesOrderEventTimelinePanel(
  props: OrderEventTimelinePanelProps<SalesOrder, TransOrderEvent>,
) {
  const events = props.events;
  const orderId = props.order.id;

  const toast = useToast();
  const [displayAddDialog, setDisplayAddDialog] = useState(false);

  const { mutate: createEvent, isLoading } = useMutation(
    createSalesOrderEvent,
    {
      onSuccess: (resp) => {
        props.onAdd(resp);
        toast({
          title: 'Event created!',
          description: 'A new event has been added.',
          duration: 2000,
          status: 'success',
        });
        setDisplayAddDialog(false);
      },
    },
  );

  return (
    <Stack spacing={5}>
      <SectionText>Progress</SectionText>

      <EventTimeline lastId={events.length - 1}>
        {events.map((event) => (
          <SalesOrderEventDisplay
            key={event.id}
            orderId={orderId}
            initEvent={event}
          />
        ))}
      </EventTimeline>

      <Button
        width={200}
        colorScheme="blue"
        alignSelf="start"
        isDisabled={!props.order.isExecuting}
        onClick={() => setDisplayAddDialog(true)}
      >
        Add event
      </Button>

      <TransOrderEventAddDialog
        onSubmit={(result) => createEvent({ orderId, ...result })}
        isLoading={isLoading}
        display={displayAddDialog}
        onClose={() => setDisplayAddDialog(false)}
      />
    </Stack>
  );
}

function SalesOrderEventDisplay({
  orderId,
  initEvent,
}: OrderEventDisplayProps<TransOrderEvent>) {
  const [event, setEvent] = useState(initEvent);

  const { mutate: updateEvent } = useMutation(updateSalesOrderEvent, {
    onSuccess: setEvent,
  });

  const onChange = (input: EventUpdateData) => {
    console.log(input);
    updateEvent({
      orderId: orderId,
      id: event.id,
      location: input.location,
      message: input.message,
    });
  };

  return <TransOrderEventDisplay event={event} onChange={onChange} />;
}
