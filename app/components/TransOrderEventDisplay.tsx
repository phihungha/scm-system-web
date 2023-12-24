import { TransOrderEvent, TransOrderEventType } from '../models/trans-order';
import OrderEventDisplay, { OrderEventUpdateData } from './OrderEventDisplay';

export interface TransOrderEventDisplayProps {
  event: TransOrderEvent;
  onChange: (input: OrderEventUpdateData) => void;
}

export default function TransOrderEventDisplay(
  props: TransOrderEventDisplayProps,
) {
  const event = props.event;

  const mapTypeToDisplayName = (type: TransOrderEventType) => {
    switch (type) {
      case 'Processing':
        return 'Processing';
      case 'DeliveryStarted':
        return 'Delivery started';
      case 'Left':
        return 'Left';
      case 'Arrived':
        return 'Arrived';
      case 'Interrupted':
        return 'Interrupted';
      case 'Completed':
        return 'Completed';
      case 'PaymentDue':
        return 'Payment due';
      case 'PaymentCompleted':
        return 'Payment completed';
      case 'Canceled':
        return 'Canceled';
      case 'Returned':
        return 'Returned';
      default:
        throw new Error('Invalid type');
    }
  };

  const type = mapTypeToDisplayName(event.type);

  return (
    <OrderEventDisplay
      type={type}
      time={event.time}
      location={event.location}
      message={event.message}
      isLocationEditAllowed={!event.isAutomatic}
      onChange={props.onChange}
    />
  );
}
