import apiClient from '../utils/client-api';
import {
  IProductionResponse,
  IProductionsResponse,
  ProductionInput,
} from '../types/production';
import {
  EventInput,
  IEventResponse,
  Item,
  negativeStatusInput,
  PaymentInput,
  StatusInput,
  UpdateEventInput,
} from '../types/sales';
import { ApproveInput, RejectInput } from '../types/requisition';

export const getAllProductionOrders = async () => {
  const response =
    await apiClient.get<IProductionsResponse>(`ProductionOrders`);
  return response.data;
};

export const getProductionOrder = async (id: string) => {
  const response = await apiClient.get<IProductionResponse>(
    `ProductionOrders/${id}`,
  );
  return response.data;
};

export const createProductionOrder = async (
  productionInput: ProductionInput,
) => {
  const response = await apiClient.post<IProductionResponse>(
    `ProductionOrders`,
    productionInput,
  );
  return response.data;
};

export const updateProductionOrder = async (
  id: string,
  productionInput: ProductionInput,
) => {
  const response = await apiClient.patch<IProductionResponse>(
    `ProductionOrders/${id}`,
    productionInput,
  );
  return response.data;
};

export const approveProductionOrder = async (id: string) => {
  const approve = new ApproveInput('Approved');
  const response = await apiClient.patch<IProductionResponse>(
    `ProductionOrders/${id}`,
    approve,
  );
  return response.data;
};

export const rejectProductionOrder = async (id: string, problem: string) => {
  const reject = new RejectInput(problem);
  const response = await apiClient.patch<IProductionResponse>(
    `ProductionOrders/${id}`,
    reject,
  );
  return response.data;
};

export const startProductionOrder = async (id: string) => {
  const status = new StatusInput('Executing');
  const response = await apiClient.patch<IProductionResponse>(
    `ProductionOrders/${id}`,
    status,
  );
  return response.data;
};

export const createProductionEvent = async (id: string, event: EventInput) => {
  const response = await apiClient.post<IEventResponse>(
    `ProductionOrders/${id}/events`,
    event,
  );
  return response.data;
};

export const updateProductionEvent = async (
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

export const finishProductionOrder = async (id: string) => {
  const finish = new ApproveInput('WaitingAcceptance');
  const response = await apiClient.patch<IProductionResponse>(
    `ProductionOrders/${id}`,
    finish,
  );
  return response.data;
};

export const completeProductionOrder = async (id: string) => {
  const complete = new ApproveInput('Completed');
  const response = await apiClient.patch<IProductionResponse>(
    `ProductionOrders/${id}`,
    complete,
  );
  return response.data;
};

export const completeProductionPayment = async (
  id: string,
  paymentInput: PaymentInput,
) => {
  const response = await apiClient.patch<IProductionResponse>(
    `ProductionOrders/${id}`,
    paymentInput,
  );
  return response.data;
};

export const cancelProductionOrder = async (id: string, problem: string) => {
  const cancel = new negativeStatusInput('Canceled', problem);
  const response = await apiClient.patch<IProductionResponse>(
    `ProductionOrders/${id}`,
    cancel,
  );
  return response.data;
};

export const returnProductionOrder = async (id: string, problem: string) => {
  const returned = new negativeStatusInput('Returned', problem);
  const response = await apiClient.patch<IProductionResponse>(
    `ProductionOrders/${id}`,
    returned,
  );
  return response.data;
};
