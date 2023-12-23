import { ApprovalInfo, ApprovalStatus, StandardLifecycle } from './general';
import { OrderItemParams, OrderSearchCriteria } from './order';
import { ProductionFacility } from './production-facility';
import { Supply } from './supply';
import { TransOrderItem } from './trans-order';
import { User } from './user';
import { Vendor } from './vendor';

export interface PurchaseRequisitionItem extends TransOrderItem {
  supply: Supply;
}

export type PurchaseRequisitionStatus =
  | 'Processing'
  | 'Purchasing'
  | 'Delayed'
  | 'Completed'
  | 'Canceled';

export interface PurchaseRequisition extends StandardLifecycle, ApprovalInfo {
  approveFinance: User;
  approveFinanceId: string;
  approveProductionManager: User;
  approveProductionManagerId: string;
  id: number;
  isCancelAllowed: boolean;
  isInfoUpdateAllowed: boolean;
  isPurchaseOrderCreateAllowed: boolean;
  items?: PurchaseRequisitionItem[];
  productionFacility: ProductionFacility;
  productionFacilityId: number;
  status: PurchaseRequisitionStatus;
  subTotal: number;
  totalAmount: number;
  vatAmount: number;
  vatRate: number;
  vendor: Vendor;
  vendorId: number;
}

export interface PurchaseRequisitionCreateParams {
  items: OrderItemParams[];
  vendorId: number;
}

export interface PurchaseRequisitionUpdateParams {
  id: number;
  items?: OrderItemParams[];
}

export type PurchaseRequisitionCriteria = OrderSearchCriteria | 'VendorName';

export interface PurchaseRequisitionQueryParams {
  searchCriteria?: PurchaseRequisitionCriteria;
  searchTerm?: string;
  status?: PurchaseRequisitionStatus[];
  approvalStatus?: ApprovalStatus[];
}
