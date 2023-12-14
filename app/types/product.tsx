import { Supply } from './requisition';
import { Product } from './sales';

export interface supplyCostItem {
  quantity: number;
  supply: Supply;
  supplyId: string;
  totalCost: number;
  unit: string;
  unitCost: number;
}

export interface supplyCostInput {
  supplyId: string;
  quantity: number;
}

export interface IProductResponse extends Product {
  miscCost: number;
  netWeight: number;
  cost: number;
  profit: number;
  supplyCost: number;
  supplyCostItems: supplyCostItem[];
}

export interface IProductsResponse {
  status: string;
  data: {
    sales: IProductResponse[];
  };
}

export class ProductInput {
  expirationMonth: number;
  name: string;
  price: number;
  isActive: boolean;
  netWeight: number;
  unit: string;
  description: string;
  miscCost: number;
  supplyCostItems: supplyCostInput[];
  constructor(
    expirationMonth: number,
    name: string,
    price: number,
    isActive: boolean,
    netWeight: number,
    unit: string,
    description: string,
    miscCost: number,
    supplyCostItems: supplyCostInput[],
  ) {
    this.expirationMonth = expirationMonth;
    this.name = name;
    this.price = price;
    this.isActive = isActive;
    this.netWeight = netWeight;
    this.unit = unit;
    this.description = description;
    this.miscCost = miscCost;
    this.supplyCostItems = supplyCostItems;
  }
}
