import { OrderEventCreateParams } from './event';
import { ApprovalInfo } from './interfaces';
import { Order, OrderItem, OrderItemParams } from './order';
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

export interface ProductionOrderEvent extends Event {
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
  supplyId: string;
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

export interface ProductionOrderUpdateParams {
  items?: OrderItemParams[];
}
