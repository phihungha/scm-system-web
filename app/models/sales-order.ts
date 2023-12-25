import { Customer } from './customer';
import {
  OrderItemParams,
  OrderSearchCriteria,
  OrderUpdateParams,
} from './order';
import { Product } from './product';
import { ProductionFacility } from './production-facility';
import {
  TransOrder,
  TransOrderEvent,
  TransOrderItem,
  TransOrderQueryParams,
} from './trans-order';

export interface SalesOrderItem extends TransOrderItem {
  product: Product;
}

export interface SalesOrder extends TransOrder {
  customer: Customer;
  customerId: number;
  productionFacility?: ProductionFacility;
  productionFacilityId?: number;
  events?: TransOrderEvent[];
  items?: SalesOrderItem[];
}

export interface SalesOrderCreateParams {
  items: OrderItemParams[];
  customerId: number;
  toLocation?: string;
  productionFacilityId?: number;
}

export interface SalesOrderUpdateParams extends OrderUpdateParams {
  items?: OrderItemParams[];
  toLocation?: string;
  productionFacilityId?: number;
}

export type SalesOrderSearchCriteria = OrderSearchCriteria | 'CustomerName';

export interface SalesOrderQueryParams extends TransOrderQueryParams {
  searchCriteria?: SalesOrderSearchCriteria;
}
