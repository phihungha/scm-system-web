import apiClient from '../utils/client-api';
import { ISalesResponse, ISaleResponse } from '../types/sales';

export const getAllSalesOrders = async () => {
  const response = await apiClient.get<ISalesResponse>(
    `5865903b-026d-4b38-997f-47fcc27ef0ba`,
  );
  return response.data;
};

export const getSalesOrder = async (id: string) => {
  const response = await apiClient.get<ISaleResponse>(`SalesOrders/${id}`);
  return response.data;
};
