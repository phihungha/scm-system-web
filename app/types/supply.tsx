import { Vendor } from './requisition';

export interface ISupplyResponse {
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

export interface ISuppliesResponse {
  status: string;
  data: {
    sales: ISupplyResponse[];
  };
}

export class createSupplyInput {
  vendorId: number;
  expirationMonth: number;
  name: string;
  price: number;
  unit: string;
  description: string;
  constructor(
    vendorId: number,
    expirationMonth: number,
    name: string,
    price: number,
    unit: string,
    description: string,
  ) {
    this.expirationMonth = expirationMonth;
    this.name = name;
    this.price = price;
    this.vendorId = vendorId;
    this.unit = unit;
    this.description = description;
  }
}

export class updateSupplyInput {
  vendorId: number;
  expirationMonth: number;
  name: string;
  price: number;
  unit: string;
  isActive: boolean;
  description: string;
  constructor(
    vendorId: number,
    expirationMonth: number,
    name: string,
    price: number,
    isActive: boolean,
    unit: string,
    description: string,
  ) {
    this.expirationMonth = expirationMonth;
    this.name = name;
    this.price = price;
    this.vendorId = vendorId;
    this.unit = unit;
    this.isActive = isActive;
    this.description = description;
  }
}
