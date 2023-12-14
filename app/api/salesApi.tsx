import apiClient from '../utils/client-api';
import {
  ISalesResponse,
  ISaleResponse,
  CreateInput,
  UpdateInput,
  StatusInput,
  negativeStatusInput,
  PaymentInput,
  IEventResponse,
  EventInput,
} from '../types/sales';

export const getAllSalesOrders = async () => {
  const response = await apiClient.get<ISalesResponse>(`SalesOrders`);
  return response.data;
};

export const getSalesOrder = async (id: string) => {
  const response = await apiClient.get<ISaleResponse>(`SalesOrders/${id}`);
  return response.data;
};

export const createSalesOrder = async (createInput: CreateInput) => {
  const response = await apiClient.post<ISaleResponse>(
    `SalesOrders`,
    createInput,
  );
  return response.data;
};

export const updateSalesOrder = async (id: string, salesOrder: UpdateInput) => {
  const response = await apiClient.patch<ISaleResponse>(
    `SalesOrders/${id}`,
    salesOrder,
  );
  return response.data;
};

export const updateStatus = async (id: string, status: StatusInput) => {
  const response = await apiClient.patch<ISaleResponse>(
    `SalesOrders/${id}`,
    status,
  );
  return response.data;
};

export const updateNegativeStatus = async (
  id: string,
  status: negativeStatusInput,
) => {
  const response = await apiClient.patch<ISaleResponse>(
    `SalesOrders/${id}`,
    status,
  );
  return response.data;
};

export const completePayment = async (
  id: string,
  paymentInput: PaymentInput,
) => {
  const response = await apiClient.patch<ISaleResponse>(
    `SalesOrders/${id}`,
    paymentInput,
  );
  return response.data;
};

export const createEvent = async (id: string, event: EventInput) => {
  const response = await apiClient.post<IEventResponse>(
    `SalesOrders/${id}/events`,
    event,
  );
  return response.data;
};

export const updateEvent = async (
  id: string,
  eventId: string,
  event: EventInput,
) => {
  const response = await apiClient.patch<IEventResponse>(
    `SalesOrders/${id}/events/${eventId}`,
    event,
  );
  return response.data;
};
