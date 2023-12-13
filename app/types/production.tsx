
import { Supply } from './requisition';
import { Event, IUser, Product, productionFacility } from './sales';

export interface supplyUsageItem {
  quantity: number;
  supply: Supply;
  supplyId: string;
  totalCost: number;
  unit: string;
  unitCost: number;
}

export interface ProductionItem {
  product: Product;
  totalCost: number;
  totalValue: number;
  unitCost: number;
  unitValue: number;
  itemId: string;
  quantity: number;
  unit: string;
}

export interface IProductionResponse {
  approvalStatus: string;
  approveProductionManager: IUser;
  approveProductionManagerId: string;
  productionFacility: productionFacility;
  productionFacilityId: string;
  supplyUsageItems: supplyUsageItem[];
  totalCost: number;
  totalProfit: number;
  totalValue: number;
  events: Event[];
  items: ProductionItem[];
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

export interface IProductionsResponse {
  status: string;
  data: {
    sales: IProductionResponse[];
  };
}
