import apiClient from '../utils/client-api';
import { IPurchaseResponse, IPurchasesResponse } from '../types/purchase';

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

export const createPurchaseOrder = async (purchase: IPurchaseResponse) => {
  const response = await apiClient.post<IPurchaseResponse>(
    `PurchaseOrders`,
    purchase,
  );
  return response.data;
};

export const updatePurchaseOrder = async ({
  id,
  purchase,
}: {
  id: string;
  purchase: IPurchaseResponse;
}) => {
  const response = await apiClient.patch<IPurchaseResponse>(
    `PurchaseOrders/${id}`,
    purchase,
  );
  return response.data;
};
