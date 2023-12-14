import apiClient from '../utils/client-api';
import {
  ISalesResponse,
  ISaleResponse,
  CreateInput,
  UpdateInput,
  StatusInput,
} from '../types/sales';

export const getAllSalesOrders = async () => {
  const response = await apiClient.get<ISalesResponse>(`SalesOrders`);
  return response.data;
};

export const getSalesOrder = async (id: string) => {
  const response = await apiClient
    .get<ISaleResponse>(`SalesOrders/${id}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
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

export const startDelivery = async (id: string, status: StatusInput) => {
  const response = await apiClient.patch<ISaleResponse>(
    `SalesOrders/${id}`,
    status,
  );
  return response.data;
};
