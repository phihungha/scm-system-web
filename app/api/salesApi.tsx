import {
  EventInput,
  IEventResponse,
  ISaleResponse,
  ISalesResponse,
  PaymentInput,
  StatusInput,
  UpdateEventInput,
  UpdateInput,
  negativeStatusInput,
  salesCreateInput,
} from '../types/sales';
import apiClient from '../utils/client-api';

export const getAllSalesOrders = async () => {
  const response = await apiClient.get<ISalesResponse>(`SalesOrders`);
  return response.data;
};

export const getSalesOrder = async (id: string) => {
  const response = await apiClient.get<ISaleResponse>(`SalesOrders/${id}`);
  return response.data;
};

export const createSalesOrder = async (createInput: salesCreateInput) => {
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

export const startSalesOrder = async (id: string) => {
  const status = new StatusInput('Executing');
  const response = await apiClient.patch<ISaleResponse>(
    `SalesOrders/${id}`,
    status,
  );
  return response.data;
};

export const finishSalesOrder = async (id: string) => {
  const finish = new StatusInput('WaitingAcceptance');
  const response = await apiClient.patch<ISaleResponse>(
    `SalesOrders/${id}`,
    finish,
  );
  return response.data;
};

export const completeSalesOrder = async (id: string) => {
  const complete = new StatusInput('Completed');
  const response = await apiClient.patch<ISaleResponse>(
    `SalesOrders/${id}`,
    complete,
  );
  return response.data;
};

export const completeSalesPayment = async (
  id: string,
  paymentInput: PaymentInput,
) => {
  const response = await apiClient.patch<ISaleResponse>(
    `SalesOrders/${id}`,
    paymentInput,
  );
  return response.data;
};

export const createSalesEvent = async (id: string, event: EventInput) => {
  const response = await apiClient.post<IEventResponse>(
    `SalesOrders/${id}/events`,
    event,
  );
  return response.data;
};

export const updateSalesEvent = async (
  id: string,
  eventId: string,
  event: UpdateEventInput,
) => {
  const response = await apiClient.patch<IEventResponse>(
    `SalesOrders/${id}/events/${eventId}`,
    event,
  );
  return response.data;
};

export const cancelSalesOrder = async (id: string, problem: string) => {
  const cancel = new negativeStatusInput('Canceled', problem);
  const response = await apiClient.patch<ISaleResponse>(
    `SalesOrders/${id}`,
    cancel,
  );
  return response.data;
};

export const returnSalesOrder = async (id: string, problem: string) => {
  const returned = new negativeStatusInput('Returned', problem);
  const response = await apiClient.patch<ISaleResponse>(
    `SalesOrders/${id}`,
    returned,
  );
  return response.data;
};
