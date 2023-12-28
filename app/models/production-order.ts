import { OrderEvent, OrderEventCreateParams } from './event';
import { ApprovalInfo, ApprovalStatus } from './general';
import {
  Order,
  OrderItem,
  OrderItemParams,
  OrderQueryParams,
  OrderSearchCriteria,
  OrderUpdateParams,
} from './order';
import { Product } from './product';
import { ProductionFacility } from './production-facility';
import { Supply } from './supply';
import { User } from './user';

export type ProductionOrderEventType =
  | 'PendingApproval'
  | 'Approved'
  | 'Rejected'
  | 'Producing'
  | 'StageDone'
  | 'Produced'
  | 'Completed'
  | 'Canceled'
  | 'Unaccepted'
  | 'Interrupted';

export interface ProductionOrderEvent extends OrderEvent {
  type: ProductionOrderEventType;
}

export type ProductionOrderEventOption = 'StageDone' | 'Interrupted';

export interface ProductionOrderEventCreateParams
  extends OrderEventCreateParams {
  type: ProductionOrderEventOption;
}

export interface ProductionSupplyUsageItem {
  quantity: number;
  supply: Supply;
  supplyId: number;
  totalCost: number;
  unit: string;
  unitCost: number;
}

export interface ProductionOrderItem extends OrderItem {
  product: Product;
  totalCost: number;
  totalValue: number;
  unitCost: number;
  unitValue: number;
}

export interface ProductionOrder extends Order, ApprovalInfo {
  approveProductionManager: User;
  approveProductionManagerId: string;
  productionFacility: ProductionFacility;
  productionFacilityId: number;
  supplyUsageItems?: ProductionSupplyUsageItem[];
  totalCost: number;
  totalProfit: number;
  totalValue: number;
  events?: ProductionOrderEvent[];
  items?: ProductionOrderItem[];
}

export interface ProductionOrderCreateParams {
  items: OrderItemParams[];
}

export interface ProductionOrderUpdateParams extends OrderUpdateParams {
  items?: OrderItemParams[];
}

export type ProductionOrderSearchCriteria = OrderSearchCriteria;

export interface ProductionOrderQueryParams extends OrderQueryParams {
  searchCriteria?: ProductionOrderSearchCriteria;
  approvalStatus?: ApprovalStatus[];
}
