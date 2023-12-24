import { updateSalesOrderEvent } from '@/app/api/sales-order';
import { OrderEventUpdateData } from '@/app/components/OrderEventDisplay';
import OrderEventTimeline from '@/app/components/OrderEventTimeline';
import TransOrderEventDisplay from '@/app/components/TransOrderEventDisplay';
import { TransOrderEvent } from '@/app/models/trans-order';
import { useState } from 'react';
import { useMutation } from 'react-query';

export interface SalesOrderEventDisplay {
  orderId: number;
  events: TransOrderEvent[];
}

export default function SalesOrderEventTimeline({
  orderId,
  events,
}: SalesOrderEventDisplay) {
  return (
    <OrderEventTimeline lastId={events.length - 1}>
      {events.map((event) => (
        <SalesOrderEventDisplay
          key={event.id}
          orderId={orderId}
          initEvent={event}
        />
      ))}
    </OrderEventTimeline>
  );
}

export interface SalesOrderEventDisplayProps {
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
