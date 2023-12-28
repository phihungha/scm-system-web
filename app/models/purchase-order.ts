import { OrderQueryParams, OrderUpdateParams } from './order';
import { ProductionFacility } from './production-facility';
import { PurchaseRequisitionCriteria } from './purchase-requisition';
import { Supply } from './supply';
import {
  PaymentStatus,
  TransOrder,
  TransOrderEvent,
  TransOrderItem,
  TransOrderPaymentCompleteParams,
} from './trans-order';
import { Vendor } from './vendor';

export interface PurchaseOrderItem extends TransOrderItem {
  supply: Supply;
  discount: number;
  netPrice: number;
}

export interface PurchaseOrder extends TransOrder {
  additionalDiscount: number;
  discountAmount: number;
  discountSubtotal: number;
  invoiceUrl: string;
  isDiscountUpdateAllowed: boolean;
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
  items: PurchaseOrderItemParams[];
  additionalDiscount?: number;
  fromLocation?: string;
  purchaseRequisitionId: number;
}

export interface PurchaseOrderItemParams {
  discount: number;
  itemId: number;
}

export interface PurchaseOrderUpdateParams extends OrderUpdateParams {
  additionalDiscount?: number;
  items?: PurchaseOrderItemParams[];
  fromLocation?: string;
}

export interface PurchaseOrderCompleteParams extends OrderUpdateParams {
  hasInvoice: boolean;
}

export interface PurchaseOrderPaymentCompleteParams
  extends TransOrderPaymentCompleteParams {
  hasReceipt: boolean;
}

export type PurchaseOrderSearchCriteria = PurchaseRequisitionCriteria;

export interface PurchaseOrderQueryParams extends OrderQueryParams {
  searchCriteria?: PurchaseOrderSearchCriteria;
  paymentStatus?: PaymentStatus[];
}
