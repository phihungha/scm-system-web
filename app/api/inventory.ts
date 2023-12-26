import { SimpleItemQueryParams } from '../models/general';
import { WarehouseProductItem, WarehouseSupplyItem } from '../models/inventory';
import { ProductionOrder } from '../models/production-order';
import { PurchaseOrder } from '../models/purchase-order';
import { SalesOrder } from '../models/sales-order';
import apiClient from './api-client';

export async function getWarehouseProductItems(
  facilityId: number,
  params?: SimpleItemQueryParams,
) {
  const response = await apiClient.get<WarehouseProductItem[]>(
    `Inventory/${facilityId}/Products`,
    {
      params,
    },
  );
  return response.data;
}

export async function getWarehouseProductItem(facilityId: number, id: number) {
  const response = await apiClient.get<WarehouseProductItem>(
    `Inventory/${facilityId}/Products/${id}`,
  );
  return response.data;
}

export async function getWarehouseSupplyItem(facilityId: number, id: number) {
  const response = await apiClient.get<WarehouseSupplyItem>(
    `Inventory/${facilityId}/Supplies/${id}`,
  );
  return response.data;
}

export async function getWarehouseSupplyItems(
  facilityId: number,
  params?: SimpleItemQueryParams,
) {
  const response = await apiClient.get<WarehouseSupplyItem[]>(
    `Inventory/${facilityId}/Supplies`,
    {
      params,
    },
  );
  return response.data;
}

export async function getSalesOrdersToIssue(
  facilityId: number,
  params?: SimpleItemQueryParams,
) {
  const response = await apiClient.get<SalesOrder[]>(
    `Inventory/${facilityId}/SalesOrdersToIssue`,
    {
      params,
    },
  );
  return response.data;
}

export async function getProductionOrdersToIssue(
  facilityId: number,
  params?: SimpleItemQueryParams,
) {
  const response = await apiClient.get<ProductionOrder[]>(
    `Inventory/${facilityId}/ProductionOrdersToIssue`,
    {
      params,
    },
  );
  return response.data;
}

export async function getProductionOrdersToReceive(
  facilityId: number,
  params?: SimpleItemQueryParams,
) {
  const response = await apiClient.get<ProductionOrder[]>(
    `Inventory/${facilityId}/ProductionOrdersToReceive`,
    {
      params,
    },
  );
  return response.data;
}

export async function getPurchaseOrdersToReceive(
  facilityId: number,
  params?: SimpleItemQueryParams,
) {
  const response = await apiClient.get<PurchaseOrder[]>(
    `Inventory/${facilityId}/PurchaseOrdersToReceive`,
    {
      params,
    },
  );
  return response.data;
}
