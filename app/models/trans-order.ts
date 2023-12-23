import { OrderEvent, OrderEventCreateParams } from './event';
import { Order, OrderItem } from './order';

export type TransOrderEventType =
  | 'Processing'
  | 'DeliveryStarted'
  | 'Left'
  | 'Arrived'
  | 'Delivered'
  | 'Completed'
  | 'PaymentDue'
  | 'PaymentCompleted'
  | 'Canceled'
  | 'Returned'
  | 'Interrupted';

export type TransOrderEventOption = 'Left' | 'Arrived' | 'Interrupted';

export interface TransOrderEvent extends OrderEvent {
  type: TransOrderEventType;
}

export interface TransOrderEventCreateParams extends OrderEventCreateParams {
  type: TransOrderEventOption;
}

export type PaymentStatus = 'Pending' | 'Due' | 'Completed';

export interface TransOrder extends Order {
  fromLocation: string;
  isPaymentCompleteAllowed: boolean;
  isToLocationUpdateAllowed: boolean;
  paymentStatus: string;
  remainingAmount: number;
  subTotal: number;
  toLocation: string;
  totalAmount: number;
  vatAmount: number;
  vatRate: number;
}

export interface TransOrderItem extends OrderItem {
  totalPrice: number;
  unitPrice: number;
}
