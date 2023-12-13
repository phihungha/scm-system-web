import apiClient from '../utils/client-api';
import { ISalesResponse, ISaleResponse } from '../types/sales';

export const getAllSalesOrders = async () => {
  const response = await apiClient.get<ISalesResponse>(`SalesOrders`);
  return response.data;
};

export const getSalesOrder = async (id: string) => {
  const response = await apiClient.get<ISaleResponse>(`SalesOrders/${id}`);
  return response.data;
};

export const createSalesOrder = async (salesOrder: ISaleResponse) => {
  const response = await apiClient.post<ISaleResponse>(
    `SalesOrders`,
    salesOrder,
  );
  return response.data;
};

export const updateSalesOrder = async ({
  id,
  salesOrder,
}: {
  id: string;
  salesOrder: ISaleResponse;
}) => {
  const response = await apiClient.patch<ISaleResponse>(
    `SalesOrders/${id}`,
    salesOrder,
  );
  return response.data;
};
