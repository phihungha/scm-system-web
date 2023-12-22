import { OrderEventUpdateParams } from '../models/event';
import {
  SalesOrder,
  SalesOrderCreateParams,
  SalesOrderUpdateParams,
} from '../models/sales-order';
import {
  TransOrderEvent,
  TransOrderEventCreateParams,
} from '../models/trans-order';
import apiClient from '../utils/client-api';

export async function getSalesOrders() {
  const response = await apiClient.get<SalesOrder>(`SalesOrders`);
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

export async function updateSalesOrder(
  id: number,
  params: SalesOrderUpdateParams,
) {
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

export async function completeSalesOrderPayment(id: number, payAmount: number) {
  const body = { payAmount };
  const response = await apiClient.patch<SalesOrder>(`SalesOrders/${id}`, body);
  return response.data;
}

export async function cancelSalesOrder(id: number, problem: string) {
  const body = { status: 'Canceled', problem };
  const response = await apiClient.patch<SalesOrder>(`SalesOrders/${id}`, body);
  return response.data;
}

export async function returnSalesOrder(id: number, problem: string) {
  const body = { status: 'Returned', problem };
  const response = await apiClient.patch<SalesOrder>(`SalesOrders/${id}`, body);
  return response.data;
}

export async function createSalesOrderEvent(
  id: number,
  params: TransOrderEventCreateParams,
) {
  const response = await apiClient.post<TransOrderEvent>(
    `SalesOrders/${id}/events`,
    params,
  );
  return response.data;
}

export async function updateSalesOrderEvent(
  id: number,
  eventId: number,
  params: OrderEventUpdateParams,
) {
  const response = await apiClient.patch<TransOrderEvent>(
    `SalesOrders/${id}/events/${eventId}`,
    params,
  );
  return response.data;
}
