import { TransOrderEvent, TransOrderEventOption } from '../models/trans-order';
import {
  OrderEventAddDialog,
  OrderEventAddDialogResult,
  OrderEventAddDialogTypeOption,
  OrderEventDisplay,
  OrderEventUpdateData,
} from './order-events';

export interface TransOrderEventDisplayProps {
  event: TransOrderEvent;
  onChange: (input: OrderEventUpdateData) => void;
}

export function TransOrderEventDisplay(props: TransOrderEventDisplayProps) {
  const event = props.event;

  const displayNames = {
    Processing: 'Processing',
    DeliveryStarted: 'Delivery started',
    Left: 'Left',
    Arrived: 'Arrived',
    Interrupted: 'Interrupted',
    Delivered: 'Delivered & Waiting to accept',
    Completed: 'Completed',
    PaymentDue: 'Payment due',
    PaymentCompleted: 'Payment completed',
    Canceled: 'Canceled',
    Returned: 'Returned',
  };
  const typeDisplayName = displayNames[event.type];

  const isEndedInError = event.type === 'Canceled' || event.type === 'Returned';
  const isInterrupted = event.type === 'Interrupted';

  return (
    <OrderEventDisplay
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

export interface TransOrderEventAddDialogResult {
  type: TransOrderEventOption;
  location: string;
  message?: string;
}

export interface TransOrderEventAddDialogProps {
  display: boolean;
  isLoading?: boolean;
  onSubmit: (result: TransOrderEventAddDialogResult) => void;
  onClose: () => void;
}

export function TransOrderEventAddDialog(props: TransOrderEventAddDialogProps) {
  const typeOptions: OrderEventAddDialogTypeOption[] = [
    { name: 'Left', displayName: 'Left' },
    { name: 'Arrived', displayName: 'Arrived' },
    { name: 'Interrupted', displayName: 'Interrupted' },
  ];

  const onSubmit = ({ type, ...params }: OrderEventAddDialogResult) => {
    props.onSubmit({ ...params, type: type as TransOrderEventOption });
  };

  return (
    <OrderEventAddDialog
      typeOptions={typeOptions}
      defaultTypeOption="Left"
      onSubmit={onSubmit}
      isLoading={props.isLoading}
      display={props.display}
      onClose={props.onClose}
    />
  );
}
