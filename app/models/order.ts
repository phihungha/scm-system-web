import { StandardLifecycle } from './general';

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
  isAcceptAllowed: boolean;
  isCancelAllowed: boolean;
  isExecuting: boolean;
  isExecutionFinishAllowed: boolean;
  isExecutionFinished: boolean;
  isExecutionInfoUpdateAllowed: boolean;
  isExecutionStartAllowed: boolean;
  isProcessing: boolean;
  status: OrderStatus;
}

export interface OrderUpdateParams {
  id: number;
}

export type OrderSearchCriteria =
  | 'Id'
  | 'CreateUserName'
  | 'ProductionFacilityName';

export interface OrderQueryParams {
  status?: OrderStatus[];
  searchTerm?: string;
}
