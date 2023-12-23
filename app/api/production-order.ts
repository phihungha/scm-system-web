import { OrderEventUpdateParams } from '../models/event';
import { ProblemParams } from '../models/general';
import {
  ProductionOrder,
  ProductionOrderCreateParams,
  ProductionOrderEvent,
  ProductionOrderEventCreateParams,
  ProductionOrderQueryParams,
  ProductionOrderUpdateParams,
} from '../models/production-order';
import apiClient from './api-client';

export async function getProductionOrders(params: ProductionOrderQueryParams) {
  const response = await apiClient.get<ProductionOrder[]>('ProductionOrders', {
    params,
  });
  return response.data;
}

export async function getProductionOrder(id: number) {
  const response = await apiClient.get<ProductionOrder>(
    `ProductionOrders/${id}`,
  );
  return response.data;
}

export async function createProductionOrder(
  params: ProductionOrderCreateParams,
) {
  const response = await apiClient.post<ProductionOrder>(
    'ProductionOrders',
    params,
  );
  return response.data;
}

export async function updateProductionOrder({
  id,
  ...params
}: ProductionOrderUpdateParams) {
  const response = await apiClient.patch<ProductionOrder>(
    `ProductionOrders/${id}`,
    params,
  );
  return response.data;
}

export async function approveProductionOrder(id: number) {
  const body = { approvalStatus: 'Approved' };
  const response = await apiClient.patch<ProductionOrder>(
    `ProductionOrders/${id}`,
    body,
  );
  return response.data;
}

export async function rejectProductionOrder({ id, problem }: ProblemParams) {
  const body = { approvalStatus: 'Rejected', problem };
  const response = await apiClient.patch<ProductionOrder>(
    `ProductionOrders/${id}`,
    body,
  );
  return response.data;
}

export async function startProductionOrder(id: number) {
  const body = { status: 'Executing' };
  const response = await apiClient.patch<ProductionOrder>(
    `ProductionOrders/${id}`,
    body,
  );
  return response.data;
}

export async function finishProductionOrder(id: number) {
  const body = { status: 'WaitingAcceptance' };
  const response = await apiClient.patch<ProductionOrder>(
    `ProductionOrders/${id}`,
    body,
  );
  return response.data;
}

export async function completeProductionOrder(id: number) {
  const body = { status: 'Completed' };
  const response = await apiClient.patch<ProductionOrder>(
    `ProductionOrders/${id}`,
    body,
  );
  return response.data;
}

export async function cancelProductionOrder({ id, problem }: ProblemParams) {
  const body = { status: 'Canceled', problem };
  const response = await apiClient.patch<ProductionOrder>(
    `ProductionOrders/${id}`,
    body,
  );
  return response.data;
}

export async function returnProductionOrder({ id, problem }: ProblemParams) {
  const body = { status: 'Returned', problem };
  const response = await apiClient.patch<ProductionOrder>(
    `ProductionOrders/${id}`,
    body,
  );
  return response.data;
}

export async function createProductionOrderEvent({
  orderId,
  ...params
}: ProductionOrderEventCreateParams) {
  const response = await apiClient.post<ProductionOrderEvent>(
    `ProductionOrders/${orderId}/events`,
    params,
  );
  return response.data;
}

export async function updateProductionOrderEvent({
  orderId,
  id,
  ...params
}: OrderEventUpdateParams) {
  const response = await apiClient.patch<ProductionOrderEvent>(
    `ProductionOrders/${orderId}/events/${id}`,
    params,
  );
  return response.data;
}
