import { OrderEventUpdateParams } from '../models/event';
import { ProblemParams } from '../models/general';
import {
  SalesOrder,
  SalesOrderCreateParams,
  SalesOrderQueryParams,
  SalesOrderUpdateParams,
} from '../models/sales-order';
import {
  TransOrderEvent,
  TransOrderEventCreateParams,
  TransOrderPaymentCompleteParams,
} from '../models/trans-order';
import apiClient from './api-client';

export async function getSalesOrders(params: SalesOrderQueryParams) {
  const response = await apiClient.get<SalesOrder[]>('SalesOrders', { params });
  return response.data;
}

export async function getSalesOrder(id: number) {
  const response = await apiClient.get<SalesOrder>(`SalesOrders/${id}`);
  return response.data;
}

export async function createSalesOrder(params: SalesOrderCreateParams) {
  const response = await apiClient.post<SalesOrder>(`SalesOrders`, params);
  return response.data;
}

export async function updateSalesOrder({
  id,
  ...params
}: SalesOrderUpdateParams) {
  const response = await apiClient.patch<SalesOrder>(
    `SalesOrders/${id}`,
    params,
  );
  return response.data;
}

export async function startSalesOrder(id: number) {
  const body = { status: 'Executing' };
  const response = await apiClient.patch<SalesOrder>(`SalesOrders/${id}`, body);
  return response.data;
}

export async function finishSalesOrder(id: number) {
  const body = { status: 'WaitingAcceptance' };
  const response = await apiClient.patch<SalesOrder>(`SalesOrders/${id}`, body);
  return response.data;
}

export async function completeSalesOrder(id: number) {
  const body = { status: 'Completed' };
  const response = await apiClient.patch<SalesOrder>(`SalesOrders/${id}`, body);
  return response.data;
}

export async function completeSalesOrderPayment({
  id,
  payAmount,
}: TransOrderPaymentCompleteParams) {
  const body = { payAmount };
  const response = await apiClient.patch<SalesOrder>(`SalesOrders/${id}`, body);
  return response.data;
}

export async function cancelSalesOrder({ id, problem }: ProblemParams) {
  const body = { status: 'Canceled', problem };
  const response = await apiClient.patch<SalesOrder>(`SalesOrders/${id}`, body);
  return response.data;
}

export async function returnSalesOrder({ id, problem }: ProblemParams) {
  const body = { status: 'Returned', problem };
  const response = await apiClient.patch<SalesOrder>(`SalesOrders/${id}`, body);
  return response.data;
}

export async function createSalesOrderEvent({
  orderId,
  ...params
}: TransOrderEventCreateParams) {
  const response = await apiClient.post<TransOrderEvent>(
    `SalesOrders/${orderId}/events`,
    params,
  );
  return response.data;
}

export async function updateSalesOrderEvent({
  orderId,
  id,
  ...params
}: OrderEventUpdateParams) {
  const response = await apiClient.patch<TransOrderEvent>(
    `SalesOrders/${orderId}/events/${id}`,
    params,
  );
  return response.data;
}
