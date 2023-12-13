import apiClient from '../utils/client-api';
import { ISupplyResponse, ISuppliesResponse } from '../types/supply';

export const getAllSupplies = async () => {
  const response = await apiClient.get<ISuppliesResponse>(`Supplies`);
  return response.data;
};

export const getSupply = async (id: string) => {
  const response = await apiClient.get<ISupplyResponse>(`Supplies/${id}`);
  return response.data;
};

export const createSupply = async (supply: ISupplyResponse) => {
  const response = await apiClient.post<ISupplyResponse>(`Supplies`, supply);
  return response.data;
};

export const updateSupply = async ({
  id,
  supply,
}: {
  id: string;
  supply: ISupplyResponse;
}) => {
  const response = await apiClient.patch<ISupplyResponse>(
    `Supplies/${id}`,
    supply,
  );
  return response.data;
};
