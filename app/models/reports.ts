import { Customer } from './customer';
import { Product } from './product';
import { ProductionFacility } from './production-facility';
import { ProductionOrder } from './production-order';
import { PurchaseOrder } from './purchase-order';
import { SalesOrder } from './sales-order';
import { Supply } from './supply';
import { Vendor } from './vendor';

export interface ReportQueryParams {
  startMonth: number;
  startYear: number;
  endMonth: number;
  endYear: number;
}

/* Các array ReportChartPoint hiện biểu đồ line hoặc bar.
Name là trục X, value là trục Y.

Riêng mấy property FinalStatus thì hiện biểu đồ pie
với name là tên status (nên dùng components/OrderStatusBadge để hiện màu cho bàn bản nếu được),
value là số lượng order thuộc status đó.

Các giá trị number sử dụng dial.

Các array kiểu {item, value} hiện bảng.
Bảng nên có cột ID, product name/customer name/..., và total amount/quantity sold/...
*/

export interface ReportChartPoint {
  name: string;
  value: number;
}

export interface SalesReport {
  averageDeliveryTime: number;
  averageDeliveryTimeByMonth: ReportChartPoint[];
  averageRevenue: number;
  highestValueOrders: { item: SalesOrder; value: number }; // value là Total amount
  mostFrequentCustomers: { item: Customer; value: number }; // value là Number of orders
  mostPopularProducts: { item: Product; value: number }; // value là Quantity sold
  orderCountByFinalStatus: ReportChartPoint[];
  revenueByMonth: ReportChartPoint[];
  totalRevenue: number;
}

export interface PurchaseReport {
  averageCost: number;
  averageDeliveryTime: number;
  averageDeliveryTimeByMonth: ReportChartPoint[];
  costByMonth: ReportChartPoint[];
  highestCostOrders: { item: PurchaseOrder; value: number }; // value là Total amount
  mostBoughtSupplies: { item: Supply; value: number }; // value là Quantity bought
  mostFrequentVendors: { item: Vendor; value: number }; // value là Number of orders
  orderCountByFinalStatus: ReportChartPoint[];
  totalCost: number;
}

export interface ProductionReport {
  averageCost: number;
  averageProductionTime: number;
  averageProductionTimeByMonth: ReportChartPoint[];
  averageValue: number;
  costByMonth: ReportChartPoint[];
  highestValueOrders: { item: ProductionOrder; value: number }; // value là Total value
  mostFrequentFacilities: { item: ProductionFacility; value: number }; // value là Number of orders
  mostProducedProducts: { item: Product; value: number }; // value là Quantity
  mostUsedSupplies: { item: Supply; value: number }; // value là Quantity
  orderCountByFinalStatus: ReportChartPoint[];
  totalCost: number;
  totalValue: number;
  valueByMonth: ReportChartPoint[];
}
