import { Stepper } from '@chakra-ui/react';

export interface OrderEventTimelineProps {
  lastId: number;
  children: React.ReactNode;
}

export default function OrderEventTimeline(props: OrderEventTimelineProps) {
  return (
    <Stepper orientation="vertical" index={props.lastId} gap={0}>
      {props.children}
    </Stepper>
  );
}
