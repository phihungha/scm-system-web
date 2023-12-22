import { Supply, SupplyParams } from '../models/supply';
import apiClient from '../utils/client-api';

export async function getSupplies() {
  const response = await apiClient.get<Supply>(`Supplies`);
  return response.data;
}

export async function getSupply(id: number) {
  const response = await apiClient.get<Supply>(`Supplies/${id}`);
  return response.data;
}

export async function createSupply(params: SupplyParams) {
  const response = await apiClient.post<Supply>(`Supplies`, params);
  return response.data;
}

export async function updateSupply(id: number, params: SupplyParams) {
  const response = await apiClient.patch<Supply>(`Supplies/${id}`, params);
  return response.data;
}
