import { StandardLifecycle } from './interfaces';

export type OrderStatus =
  | 'Processing'
  | 'Executing'
  | 'Interrupted'
  | 'WaitingAcceptance'
  | 'Completed'
  | 'Canceled'
  | 'Returned';

export interface OrderItem {
  itemId: number;
  unit: string;
  quantity: number;
}

export interface OrderItemParams {
  itemId: number;
  quantity: number;
}

export interface Order extends StandardLifecycle {
  executionFinishTime: Date;
  id: number;
  status: OrderStatus;
}
