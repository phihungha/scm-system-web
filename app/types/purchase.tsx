import { Vendor, RequisitionItem } from './requisition';
import { productionFacility, Event, IUser } from './sales';

export interface IPurchaseResponse {
  additionalDiscount: number;
  discountAmount: number;
  discountSubtotal: number;
  invoiceUrl: string;
  netSubtotal: number;
  productionFacility: productionFacility;
  productionFacilityId: string;
  purchaseRequisitionId: string;
  receiptUrl: string;
  vendor: Vendor;
  vendorId: string;
  fromLocation: string;
  paymentStatus: string;
  remainingAmount: number;
  subTotal: number;
  toLocation: string;
  totalAmount: number;
  vatAmount: number;
  vatRate: number;
  events: Event[];
  id: string;
  items: RequisitionItem[];
  status: string;
  createTime: Date;
  createUser: IUser;
  createUserId: string;
  endTime: Date;
  endUser: IUser;
  endUserId: string;
  executionFinishTime: Date;
  problem: string;
  updateTime: Date;
}

export interface IPurchasesResponse {
  status: string;
  data: {
    sales: IPurchaseResponse[];
  };
}
