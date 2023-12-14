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

export interface Event {
  type: string;
  id: string;
  location: string;
  message: string;
  email: string;
  time: Date;
  isAutomatic: boolean;
}

export interface Item {
  product: Product;
  totalPrice: number;
  unitPrice: number;
  itemId: string;
  quantity: number;
  unit: string;
}

export interface productionFacility {
  id: string;
  name: string;
  description: string;
  location: string;
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
  title: string;
}

export interface LoginInput {
  userName: string;
  password: string;
}

export class CreateInput {
  items: ItemInput[];
  customerId: number;
  constructor(items: ItemInput[], customerId: number) {
    this.items = items;
    this.customerId = customerId;
  }
}

export class UpdateInput {
  items: ItemInput[];
  toLocation: string;
  productionFaciltyId: number;
  constructor(
    items: ItemInput[],
    toLocation: string,
    productionFaciltyId: number,
  ) {
    this.items = items;
    this.productionFaciltyId = productionFaciltyId;
    this.toLocation = toLocation;
  }
}

export class ItemInput {
  itemId: number;
  quantity: number;
  constructor(itemId: number, quantity: number) {
    this.itemId = itemId;
    this.quantity = quantity;
  }
}

export class StatusInput {
  status: string;
  constructor(status: string) {
    this.status = status;
  }
}

export class PaymentInput {
  payAmount: number;
  constructor(payAmount: number) {
    this.payAmount = payAmount;
  }
}

export class negativeStatusInput {
  status: string;
  problem: string;
  constructor(status: string, problem: string) {
    this.status = status;
    this.problem = problem;
  }
}

export class EventInput {
  type: string;
  location: string;
  message: string;
  constructor(type: string, location: string, message: string) {
    this.type = type;
    this.location = location;
    this.message = message;
  }
}

export interface IEventResponse {
  type: string;
  id: string;
  location: string;
  message: string;
  time: Date;
  isAutomatic: boolean;
}
