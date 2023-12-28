import {
  createProductionOrderEvent,
  updateProductionOrderEvent,
} from '@/app/api/production-order';
import { EventTimeline, EventUpdateData } from '@/app/components/events';
import {
  OrderEventDisplayProps,
  OrderEventTimelinePanelProps,
} from '@/app/components/order-events';
import { SectionText } from '@/app/components/texts';
import {
  ProductionOrder,
  ProductionOrderEvent,
} from '@/app/models/production-order';
import { Button, Stack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { ProductionOrderEventCard } from './ProductionEventCard';
import { ProductionOrderEventAddDialog } from './ProductionOrderEventAddDialog';
export default function ProductionOrderEventTimelinePanel(
  props: OrderEventTimelinePanelProps<ProductionOrder, ProductionOrderEvent>,
) {
  const events = props.events;
  const orderId = props.order.id;

  const toast = useToast();
  const [displayAddDialog, setDisplayAddDialog] = useState(false);

  const { mutate: createEvent, isLoading } = useMutation(
    createProductionOrderEvent,
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
          <ProductionOrderEventDisplay
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

      <ProductionOrderEventAddDialog
        onSubmit={(result) => createEvent({ orderId, ...result })}
        isLoading={isLoading}
        display={displayAddDialog}
        onClose={() => setDisplayAddDialog(false)}
      />
    </Stack>
  );
}

function ProductionOrderEventDisplay({
  orderId,
  initEvent,
}: OrderEventDisplayProps<ProductionOrderEvent>) {
  const [event, setEvent] = useState(initEvent);

  const { mutate: updateEvent } = useMutation(updateProductionOrderEvent, {
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

  return <ProductionOrderEventCard event={event} onChange={onChange} />;
}
