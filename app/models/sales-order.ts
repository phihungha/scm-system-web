import { Customer } from './customer';
import {
  OrderItem,
  OrderItemParams,
  OrderSearchCriteria,
  OrderUpdateParams,
} from './order';
import { Product } from './product';
import { ProductionFacility } from './production-facility';
import {
  TransOrder,
  TransOrderEvent,
  TransOrderQueryParams,
} from './trans-order';

export interface SalesOrderItem extends OrderItem {
  product: Product;
}

export interface SalesOrder extends TransOrder {
  customer: Customer;
  customerId: number;
  productionFacility: ProductionFacility;
  productionFacilityId: number;
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

export class PriceInput {
  itemId: number;
  quantity: number;
  price: number;
  constructor(itemId: number, quantity: number, price: number) {
    this.itemId = itemId;
    this.quantity = quantity;
    this.price = price;
  }
}

export interface SaleDetailsProps {
  params: {
    orderId: string;
  };
}

export type SalesOrderSearchCriteria = OrderSearchCriteria | 'CustomerName';

export interface SalesOrderQueryParams extends TransOrderQueryParams {
  searchCriteria?: SalesOrderSearchCriteria;
}
