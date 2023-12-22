import { RequisitionItem, Vendor } from './requisition';
import { Event, IUser, ItemInput, productionFacility } from './sales';

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

export class purchaseCreateInput {
  items: ItemInput[];
  purchaseRequisitionId: number;
  constructor(items: ItemInput[], purchaseRequisitionId: number) {
    this.items = items;
    this.purchaseRequisitionId = purchaseRequisitionId;
  }
}

export class purchaseUpdateInput {
  items: ItemInput[];
  fromLocation: string;
  additionalDiscount: number;
  constructor(
    items: ItemInput[],
    fromLocation: string,
    additionalDiscount: number,
  ) {
    this.items = items;
    this.additionalDiscount = additionalDiscount;
    this.fromLocation = fromLocation;
  }
}

export class completePurchaseInput {
  invoiceUrl: string;
  status: string;
  constructor(invoiceUrl: string) {
    this.invoiceUrl = invoiceUrl;
    this.status = 'Completed';
  }
}

export class purchasePaymentInput {
  receiptUrl: string;
  payAmount: number;
  constructor(receiptUrl: string, payAmount: number) {
    this.receiptUrl = receiptUrl;
    this.payAmount = payAmount;
  }
}
