export interface OrderEvent {
  id: number;
  location?: string;
  message?: string;
  time: Date;
  isAutomatic: boolean;
}

export interface OrderEventCreateParams {
  location: string;
  message?: string;
}

export interface OrderEventUpdateParams {
  location?: string;
  message?: string;
}
