import apiClient from '../utils/client-api';
import { IProductionResponse, IProductionsResponse } from '../types/production';
import { CreateInput } from '../types/sales';

export const getAllProductionOrders = async () => {
  const response =
    await apiClient.get<IProductionsResponse>(`ProductionOrders`);
  return response.data;
};

export const getProductionOrder = async (id: string) => {
  const response = await apiClient.get<IProductionResponse>(
    `PurchaseOrders/${id}`,
  );
  return response.data;
};

export const createProductionOrder = async (production: CreateInput) => {
  const response = await apiClient.post<IProductionResponse>(
    `PurchaseOrders`,
    production,
  );
  return response.data;
};

export const updatePurchaseOrder = async ({
  id,
  production,
}: {
  id: string;
  production: IProductionResponse;
}) => {
  const response = await apiClient.patch<IProductionResponse>(
    `PurchaseOrders/${id}`,
    production,
  );
  return response.data;
};
