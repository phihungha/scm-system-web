import apiClient from '../utils/client-api';
import {
  completePurchaseInput,
  IPurchaseResponse,
  IPurchasesResponse,
  purchaseCreateInput,
  purchasePaymentInput,
  purchaseUpdateInput,
} from '../types/purchase';
import {
  EventInput,
  IEventResponse,
  negativeStatusInput,
  StatusInput,
  UpdateEventInput,
} from '../types/sales';

export const getAllPurchaseOrders = async () => {
  const response = await apiClient.get<IPurchasesResponse>(`PurchaseOrders`);
  return response.data;
};

export const getPurchaseOrder = async (id: string) => {
  const response = await apiClient.get<IPurchaseResponse>(
    `PurchaseOrders/${id}`,
  );
  return response.data;
};

export const createPurchaseOrder = async (purchase: purchaseCreateInput) => {
  const response = await apiClient.post<IPurchaseResponse>(
    `PurchaseOrders`,
    purchase,
  );
  return response.data;
};

export const updatePurchaseOrder = async (
  id: string,
  purchase: purchaseUpdateInput,
) => {
  const response = await apiClient.patch<IPurchaseResponse>(
    `PurchaseOrders/${id}`,
    purchase,
  );
  return response.data;
};

export const startPurchaseOrder = async (id: string) => {
  const status = new StatusInput('Executing');
  const response = await apiClient.patch<IPurchaseResponse>(
    `PurchaseOrders/${id}`,
    status,
  );
  return response.data;
};

export const finishPurchaseOrder = async (id: string) => {
  const finish = new StatusInput('WaitingAcceptance');
  const response = await apiClient.patch<IPurchaseResponse>(
    `PurchaseOrders/${id}`,
    finish,
  );
  return response.data;
};

export const createPurchaseEvent = async (id: string, event: EventInput) => {
  const response = await apiClient.post<IEventResponse>(
    `PurchaseOrders/${id}/events`,
    event,
  );
  return response.data;
};

export const updatePurchaseEvent = async (
  id: string,
  eventId: string,
  event: UpdateEventInput,
) => {
  const response = await apiClient.patch<IEventResponse>(
    `PurchaseOrders/${id}/events/${eventId}`,
    event,
  );
  return response.data;
};

export const completePurchaseOrder = async (id: string, invoiceUrl: string) => {
  const complete = new completePurchaseInput(invoiceUrl);
  const response = await apiClient.patch<IPurchaseResponse>(
    `PurchaseOrders/${id}`,
    complete,
  );
  return response.data;
};

export const completePurchasePayment = async (
  id: string,
  paymentInput: purchasePaymentInput,
) => {
  const response = await apiClient.patch<IPurchaseResponse>(
    `PurchaseOrders/${id}`,
    paymentInput,
  );
  return response.data;
};

export const cancelPurchaseOrder = async (id: string, problem: string) => {
  const cancel = new negativeStatusInput('Canceled', problem);
  const response = await apiClient.patch<IPurchaseResponse>(
    `PurchaseOrders/${id}`,
    cancel,
  );
  return response.data;
};

export const returnPurchaseOrder = async (id: string, problem: string) => {
  const returned = new negativeStatusInput('Returned', problem);
  const response = await apiClient.patch<IPurchaseResponse>(
    `PurchaseOrders/${id}`,
    returned,
  );
  return response.data;
};
