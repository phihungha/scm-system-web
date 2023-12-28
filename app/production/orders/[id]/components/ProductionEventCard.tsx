import { EventCard, EventUpdateData } from '@/app/components/events';
import { ProductionOrderEvent } from '@/app/models/production-order';

export interface ProductionOrderEventCardProps {
  event: ProductionOrderEvent;
  onChange: (input: EventUpdateData) => void;
}

export function ProductionOrderEventCard(props: ProductionOrderEventCardProps) {
  const event = props.event;

  const displayNames = {
    PendingApproval: 'Pending Approval',
    Approved: 'Approved',
    Rejected: 'Rejected',
    Producing: 'Producing',
    StageDone: 'StageDone',
    Produced: 'Produced',
    Completed: 'Completed',
    Unaccepted: 'Unaccepted',
    Canceled: 'Canceled',
    Interrupted: 'Interrupted',
  };
  const typeDisplayName = displayNames[event.type];

  const isEndedInError = event.type === 'Canceled' || event.type === 'Rejected';
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
      onChange={props.onChange}
    />
  );
}
