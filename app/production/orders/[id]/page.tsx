import {
  createProductionOrderEvent,
  updateProductionOrderEvent,
} from '@/app/api/production-order';
import { DialogProps } from '@/app/components/dialogs';
import {
  EventAddDialog,
  EventAddDialogResult,
  EventAddDialogTypeOption,
  EventCard,
  EventTimeline,
  EventUpdateData,
} from '@/app/components/events';
import {
  OrderEventDisplayProps,
  OrderEventTimelinePanelProps,
} from '@/app/components/order-events';
import { SectionText } from '@/app/components/texts';
import {
  ProductionOrder,
  ProductionOrderEvent,
  ProductionOrderEventOption,
} from '@/app/models/production-order';
import { Button, Stack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation } from 'react-query';

function ProductionOrderEventTimelinePanel(
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
          <ProductionOrderEventCard
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

function ProductionOrderEventCard({
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

  const displayNames = {
    PendingApproval: 'Pending approval',
    Approved: 'Approved',
    Rejected: 'Rejected',
    Producing: 'Production started',
    StageDone: 'Stage finished',
    Interrupted: 'Interrupted',
    Produced: 'Production finished & Waiting to accept',
    Completed: 'Completed',
    Canceled: 'Canceled',
    Unaccepted: 'Denied & Returned',
  };

  const typeDisplayName = displayNames[event.type];

  const isEndedInError =
    event.type === 'Canceled' ||
    event.type === 'Interrupted' ||
    event.type === 'Rejected';
  const isInterrupted = event.type === 'Interrupted';

  return (
    <EventCard
      type={typeDisplayName}
      time={event.time}
      location={event.location}
      message={event.message}
      isEndedInError={isEndedInError}
      isInterrupted={isInterrupted}
      isLocationEditDisabled={event.isAutomatic}
      onChange={onChange}
    />
  );
}

interface ProductionOrderEventAddDialogResult {
  type: ProductionOrderEventOption;
  location: string;
  message?: string;
}

interface ProductionOrderEventAddDialogProps extends DialogProps {
  onSubmit: (result: ProductionOrderEventAddDialogResult) => void;
}

function TransOrderEventAddDialog(props: ProductionOrderEventAddDialogProps) {
  const typeOptions: EventAddDialogTypeOption[] = [
    { name: 'StageDone', displayName: 'Stage finished' },
    { name: 'Interrupted', displayName: 'Interrupted' },
  ];

  const onSubmit = ({ type, ...params }: EventAddDialogResult) => {
    props.onSubmit({ ...params, type: type as ProductionOrderEventOption });
  };

  return (
    <EventAddDialog
      typeOptions={typeOptions}
      defaultTypeOption="Left"
      onSubmit={onSubmit}
      isLoading={props.isLoading}
      display={props.display}
      onClose={props.onClose}
    />
  );
}
