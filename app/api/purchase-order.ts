import { OrderEventUpdateParams } from '../models/event';
import { ProblemParams } from '../models/general';
import {
  PurchaseOrder,
  PurchaseOrderCompleteParams,
  PurchaseOrderCreateParams,
  PurchaseOrderPaymentCompleteParams,
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

export async function updatePurchaseOrder({
  id,
  ...params
}: PurchaseOrderUpdateParams) {
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

export async function completePurchaseOrder({
  id,
  hasInvoice,
}: PurchaseOrderCompleteParams) {
  const body = { status: 'Completed', hasInvoice };
  const response = await apiClient.patch<PurchaseOrder>(
    `PurchaseOrders/${id}`,
    body,
  );
  return response.data;
}

export async function completePurchasePayment({
  id,
  payAmount,
  hasReceipt,
}: PurchaseOrderPaymentCompleteParams) {
  const body = { payAmount, hasReceipt };
  const response = await apiClient.patch<PurchaseOrder>(
    `PurchaseOrders/${id}`,
    body,
  );
  return response.data;
}

export async function cancelPurchaseOrder({ id, problem }: ProblemParams) {
  const body = { status: 'Canceled', problem };
  const response = await apiClient.patch<PurchaseOrder>(
    `PurchaseOrders/${id}`,
    body,
  );
  return response.data;
}

export async function returnPurchaseOrder({ id, problem }: ProblemParams) {
  const body = { status: 'Returned', problem };
  const response = await apiClient.patch<PurchaseOrder>(
    `PurchaseOrders/${id}`,
    body,
  );
  return response.data;
}

export async function createPurchaseOrderEvent({
  orderId,
  ...params
}: TransOrderEventCreateParams) {
  const response = await apiClient.post<TransOrderEvent>(
    `PurchaseOrders/${orderId}/events`,
    params,
  );
  return response.data;
}

export async function updatePurchaseOrderEvent({
  orderId,
  id,
  ...params
}: OrderEventUpdateParams) {
  const response = await apiClient.patch<TransOrderEvent>(
    `PurchaseOrders/${orderId}/events/${id}`,
    params,
  );
  return response.data;
}
