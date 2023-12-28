import {
  CreateUpdateTime,
  SoftDeletable,
  SoftDeletableParams,
} from './general';
import { Supply } from './supply';

export interface Product extends CreateUpdateTime, SoftDeletable {
  id: number;
  name: string;
  expirationMonth: number;
  description?: string;
  unit: string;
  price: number;
  imageUrl?: string;
  imageName?: string;
  miscCost: number;
  netWeight: number;
  cost: number;
  profit: number;
  supplyCost: number;
  supplyCostItems: SupplyCostItem[];
}

export interface SupplyCostItem {
  quantity: number;
  supply: Supply;
  supplyId: number;
  totalCost: number;
  unit: string;
  unitCost: number;
}

export interface SupplyCostItemParams {
  supplyId: number;
  quantity: number;
}

export interface ProductCreateParams extends SoftDeletableParams {
  expirationMonth: number;
  name: string;
  imageName?: string;
  price: number;
  netWeight: number;
  unit: string;
  description?: string;
  miscCost: number;
  supplyCostItems: SupplyCostItemParams[];
}

export interface ProductUpdateParams extends ProductCreateParams {
  id: number;
}
