import { ProductionOrder } from './production-order';
import { PurchaseOrder } from './purchase-order';
import { SalesOrder } from './sales-order';

// Các number hiện dial. Các array hiện bảng
export interface HomeInfo {
  activePurchaseOrderCount: number;
  activeProductionOrderCount: number;
  activeSalesOrderCount: number;
  activePurchaseOrders: PurchaseOrder[];
  activeProductionOrders: ProductionOrder[];
  activeSalesOrders: SalesOrder[];
}
