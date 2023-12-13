import { Supply } from "./requisition";
import { Product } from "./sales";

export interface supplyCostItem {
    quantity: number;
    supply: Supply;
    supplyId: string;
    totalCost: number;
    unit : string;
    unitCost: number;
}

export interface IProductResponse extends Product {
    miscCost: number;
    netWeight: number;
    cost: number;
    profit: number;
    supplyCost: number;
    supplyCostItems : supplyCostItem[];
}

export interface IProductsResponse {
    status: string;
    data: {
      sales: IProductResponse[];
    };
  }