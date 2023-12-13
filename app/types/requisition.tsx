import { IUser, productionFacility } from "./sales"

export interface Vendor {
    contactPerson: string;
    createTime: Date;
    defaultLocation: string;
    description: string;
    email: string;
    id: 1;
    isActive: boolean;
    name: string;
    phoneNumber: string;
    updateTime: Date;
}

export interface Supply{
        vendor: Vendor;
        vendorId: string;
        id: string;
        name: string;
        description: string;
        unit: string;
        price: number;
        isActive: boolean;
        createTime: Date;
        updateTime: Date;
}

export interface RequisitionItem{
    supply: Supply;
    totalPrice: number;
    unitPrice: number;
    itemId: string;
    quantity: number;
    unit: string
}

export interface IRequisitionResponse {
    approvalStatus: string;
    approveFinance: IUser;
    approveFinanceId: string;
    approveProductionManager: IUser;
    approveProductionManagerId: string;
    id: string;
    items: RequisitionItem[];
    productionFacility : productionFacility;
    productionFacilityId : string;
    status: string;
    subTotal: number;
    totalAmount: number;
    vatAmount: number;
    vatRate: number;
    vendor: Vendor;
    vendorId: string;
    createTime: Date;
    createUser: IUser;
    createUserId: string;
    endTime: Date;
    endUser: IUser;
    endUserId: string;
    problem: string;
    updateTime: Date;
  }

  export interface IRequisitionsResponse {
    status: string;
    data: {
      sales: IRequisitionResponse[];
    };
  }