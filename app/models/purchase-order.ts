import { OrderItemParams } from './order';
import { ProductionFacility } from './production-facility';
import { Supply } from './supply';
import { TransOrder, TransOrderEvent, TransOrderItem } from './trans-order';
import { Vendor } from './vendor';

export interface PurchaseOrderItem extends TransOrderItem {
  supply: Supply;
}

export interface PurchaseOrder extends TransOrder {
  additionalDiscount: number;
  discountAmount: number;
  discountSubtotal: number;
  invoiceUrl: string;
  netSubtotal: number;
  productionFacility: ProductionFacility;
  productionFacilityId: number;
  purchaseRequisitionId: number;
  receiptUrl: string;
  vendor: Vendor;
  vendorId: number;
  events?: TransOrderEvent[];
  items?: PurchaseOrderItem[];
}

export interface PurchaseOrderCreateParams {
  additionalDiscount?: number;
  items: OrderItemParams[];
  fromLocation?: string;
  purchaseRequisitionId: number;
}

export interface PurchaseOrderUpdateParams {
  additionalDiscount?: number;
  items?: OrderItemParams[];
  fromLocation?: string;
}
