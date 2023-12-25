'use client';

import { TransOrderEvent, TransOrderEventOption } from '../models/trans-order';
import {
  EventAddDialog,
  EventAddDialogResult,
  EventAddDialogTypeOption,
  EventDisplay,
  EventUpdateData,
} from './events';

export interface OrderEventTimelinePanelProps<TOrder, TEvent> {
  order: TOrder;
  events: TEvent[];
  isDisabled?: boolean;
  onAdd: (event: TEvent) => void;
}

export interface OrderEventDisplayProps<T> {
  orderId: number;
  initEvent: T;
}

export interface TransOrderEventDisplayProps {
  event: TransOrderEvent;
  onChange: (input: EventUpdateData) => void;
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
    <EventDisplay
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
  const typeOptions: EventAddDialogTypeOption[] = [
    { name: 'Left', displayName: 'Left' },
    { name: 'Arrived', displayName: 'Arrived' },
    { name: 'Interrupted', displayName: 'Interrupted' },
  ];

  const onSubmit = ({ type, ...params }: EventAddDialogResult) => {
    props.onSubmit({ ...params, type: type as TransOrderEventOption });
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
