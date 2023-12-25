import {
  createSalesOrderEvent,
  updateSalesOrderEvent,
} from '@/app/api/sales-order';
import {
  OrderEventTimeline,
  OrderEventUpdateData,
} from '@/app/components/order-events';
import {
  TransOrderEventAddDialog,
  TransOrderEventDisplay,
} from '@/app/components/trans-order-events';
import { TransOrderEvent } from '@/app/models/trans-order';
import { Button, Stack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation } from 'react-query';

export interface SalesOrderEventDisplay {
  orderId: number;
  events: TransOrderEvent[];
  isDisabled?: boolean;
  onAdd: (event: TransOrderEvent) => void;
}

export default function SalesOrderEventTimeline(props: SalesOrderEventDisplay) {
  const events = props.events;
  const orderId = props.orderId;

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
    <Stack spacing={3}>
      <OrderEventTimeline lastId={events.length - 1}>
        {events.map((event) => (
          <SalesOrderEventDisplay
            key={event.id}
            orderId={orderId}
            initEvent={event}
          />
        ))}
      </OrderEventTimeline>

      <Button
        onClick={() => setDisplayAddDialog(true)}
        colorScheme="blue"
        alignSelf="start"
        size="lg"
      >
        Add event
      </Button>

      <TransOrderEventAddDialog
        onSubmit={(result) =>
          createEvent({ orderId: props.orderId, ...result })
        }
        isLoading={isLoading}
        display={displayAddDialog}
        onClose={() => setDisplayAddDialog(false)}
      />
    </Stack>
  );
}

interface SalesOrderEventDisplayProps {
  orderId: number;
  initEvent: TransOrderEvent;
}

function SalesOrderEventDisplay({
  orderId,
  initEvent,
}: SalesOrderEventDisplayProps) {
  const [event, setEvent] = useState(initEvent);

  const { mutate: updateEvent } = useMutation(updateSalesOrderEvent, {
    onSuccess: setEvent,
  });

  const onChange = (input: OrderEventUpdateData) => {
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
