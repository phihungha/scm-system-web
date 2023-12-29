import { CreateUpdateTime } from './general';
import { Product } from './product';
import { ProductionFacility } from './production-facility';
import { Supply } from './supply';

export interface WarehouseItem extends CreateUpdateTime {
  totalValue: number;
  productionFacility: ProductionFacility;
  productionFacilityId: number;
  quantity: number;
  unit: string;
  unitValue: number;
}

export interface WarehouseProductItem extends WarehouseItem {
  productId: number;
  product: Product;
  events?: WarehouseProductItemEvent[];
}

export interface WarehouseSupplyItem extends WarehouseItem {
  supplyId: number;
  supply: Supply;
  events?: WarehouseSupplyItemEvent[];
}

export interface WarehouseItemEvent {
  change: number;
  quantity: number;
  time: Date;
}

export interface WarehouseProductItemEvent extends WarehouseItemEvent {
  productionOrderId?: number;
  salesOrderId?: number;
}

export interface WarehouseSupplyItemEvent extends WarehouseItemEvent {
  productionOrderId?: number;
  purchaseOrderId?: number;
}

export interface WarehouseItemUpdateParams {
  id: number;
  quantity: number;
}

export interface StockUpdateParams {
  facilityId: number;
  items: WarehouseItemUpdateParams[];
}

export interface InventoryOrderQueryParams {
  id?: number;
  all?: boolean;
}
