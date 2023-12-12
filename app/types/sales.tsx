export interface ICustomer {
    contactPerson: string;  
    createTime: Date;
    defaultLocation: string;
    description: string;
    email: string;
    id: string;
    isActive: boolean;
    name: string;
    phoneNumber: string;
    updateTime: Date;
}

export interface IUser {
    id: string;  
    userName: Date;
    email: string;
    phoneNumber: string;
    name: string;
    gender: string;
    dateOfBirth: Date;
    idCardNumber: string;
    address: string;
    isActive: boolean;
    createTime: Date;
    updateTime: Date;
}


export interface Event {
    type: string;  
    id: string;
    location: string;
    message: string;
    email: string;
    time: Date;
    isAutomatic: boolean;
}

export interface Product {
    id: string;  
    name: string;
    description: string;
    unit: string;
    price: number;
    isActive: boolean;
    createTime: Date;
    updateTime: Date;
}

export interface Item {
    product : Product;
    totalPrice : number;
    unitPrice: number;
    itemId: string;
    quantity: number;
    unit: string;
}

export interface productionFacility {
    id : string;
    name : string;
    description : string;
    location : string;
    isActive: boolean;
    createTime: Date;
    updateTime: Date;
}

export interface ISaleResponse {
    customer: ICustomer;
    customerId: string;
    productionFacility: productionFacility;
    productionFacilityId: string;
    fromLocation: string;
    invoiceUrl: string;
    paymentStatus: string;
    receiptUrl: string;
    remainingAmount: string;
    subTotal: number;
    toLocation: string;
    totalAmount: number;
    vatAmount: number;
    vatRate: number;
    events: Event[];
    executionFinishTime: Date;
    id: string;
    items: Item[];
    status: string;
    createTime: Date;
    createUser: IUser;
    createUserId: string;
    endTime: Date;
    endUser: IUser;
    endUserId: string;
    problem: string;
    updateTime: Date;
  }

  export interface ISalesResponse {
    status: string;
    data: {
      sales: ISaleResponse[];
    };
  }

  export interface GenericResponse {
    status: string;
    message: string;
  }

  export interface LoginInput {
    userName: string;
    password: string;
  }