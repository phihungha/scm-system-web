import { OrderEventUpdateParams } from '../models/event';
import {
  PurchaseOrder,
  PurchaseOrderCreateParams,
  PurchaseOrderUpdateParams,
} from '../models/purchase-order';
import {
  TransOrderEvent,
  TransOrderEventCreateParams,
} from '../models/trans-order';

import apiClient from './client-api';

export async function getPurchaseOrders() {
  const response = await apiClient.get<PurchaseOrder>(`PurchaseOrders`);
  return response.data;
}

export async function getPurchaseOrder(id: number) {
  const response = await apiClient.get<PurchaseOrder>(`PurchaseOrders/${id}`);
  return response.data;
}

export async function createPurchaseOrder(params: PurchaseOrderCreateParams) {
  const response = await apiClient.post<PurchaseOrder>(
    `PurchaseOrders`,
    params,
  );
  return response.data;
}

export async function updatePurchaseOrder(
  id: number,
  params: PurchaseOrderUpdateParams,
) {
  const response = await apiClient.patch<PurchaseOrder>(
    `PurchaseOrders/${id}`,
    params,
  );
  return response.data;
}

export async function startPurchaseOrder(id: number) {
  const body = { status: 'Executing' };
  const response = await apiClient.patch<PurchaseOrder>(
    `PurchaseOrders/${id}`,
    body,
  );
  return response.data;
}

export async function finishPurchaseOrder(id: number) {
  const body = { status: 'WaitingAcceptance' };
  const response = await apiClient.patch<PurchaseOrder>(
    `PurchaseOrders/${id}`,
    body,
  );
  return response.data;
}

export async function completePurchaseOrder(id: number, hasInvoice: boolean) {
  const body = { status: 'Completed', hasInvoice };
  const response = await apiClient.patch<PurchaseOrder>(
    `PurchaseOrders/${id}`,
    body,
  );
  return response.data;
}

export async function completePurchasePayment(
  id: number,
  payAmount: number,
  hasReceipt: boolean,
) {
  const body = { payAmount, hasReceipt };
  const response = await apiClient.patch<PurchaseOrder>(
    `PurchaseOrders/${id}`,
    body,
  );
  return response.data;
}

export async function cancelPurchaseOrder(id: number, problem: string) {
  const body = { status: 'Canceled', problem };
  const response = await apiClient.patch<PurchaseOrder>(
    `PurchaseOrders/${id}`,
    body,
  );
  return response.data;
}

export async function returnPurchaseOrder(id: number, problem: string) {
  const body = { status: 'Returned', problem };
  const response = await apiClient.patch<PurchaseOrder>(
    `PurchaseOrders/${id}`,
    body,
  );
  return response.data;
}

export async function createPurchaseOrderEvent(
  id: number,
  params: TransOrderEventCreateParams,
) {
  const response = await apiClient.post<TransOrderEvent>(
    `PurchaseOrders/${id}/events`,
    params,
  );
  return response.data;
}

export async function updatePurchaseOrderEvent(
  id: number,
  eventId: number,
  params: OrderEventUpdateParams,
) {
  const response = await apiClient.patch<TransOrderEvent>(
    `PurchaseOrders/${id}/events/${eventId}`,
    params,
  );
  return response.data;
}
