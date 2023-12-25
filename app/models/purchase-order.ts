import { ApprovalStatus } from './general';
import { OrderItemParams, OrderQueryParams, OrderUpdateParams } from './order';
import { ProductionFacility } from './production-facility';
import { PurchaseRequisitionCriteria } from './purchase-requisition';
import { Supply } from './supply';
import {
  TransOrder,
  TransOrderEvent,
  TransOrderItem,
  TransOrderPaymentCompleteParams,
} from './trans-order';
import { Vendor } from './vendor';

export interface PurchaseOrderItem extends TransOrderItem {
  supply: Supply;
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
  additionalDiscount?: number;
  items: OrderItemParams[];
  fromLocation?: string;
  purchaseRequisitionId: number;
}

export interface PurchaseOrderUpdateParams extends OrderUpdateParams {
  additionalDiscount?: number;
  items?: OrderItemParams[];
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
  approvalStatus?: ApprovalStatus[];
}
