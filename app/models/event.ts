export interface OrderEvent {
  id: number;
  location?: string;
  message?: string;
  time: Date;
  isAutomatic: boolean;
}

export interface OrderEventCreateParams {
  orderId: number;
  location: string;
  message?: string;
}

export interface OrderEventUpdateParams {
  orderId: number;
  id: number;
  location?: string;
  message?: string;
}
