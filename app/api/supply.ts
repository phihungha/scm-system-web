import { SimpleItemQueryParams, UploadInfo } from '../models/general';
import {
  Supply,
  SupplyCreateParams,
  SupplyUpdateParams,
} from '../models/supply';
import apiClient from './api-client';

export async function getSupplies(params?: SimpleItemQueryParams) {
  const response = await apiClient.get<Supply[]>('Supplies', { params });
  return response.data;
}

export async function getSupply(id: number) {
  const response = await apiClient.get<Supply>(`Supplies/${id}`);
  return response.data;
}

export async function createSupply(params: SupplyCreateParams) {
  const response = await apiClient.post<Supply>('Supplies', params);
  return response.data;
}

export async function updateSupply({ id, ...params }: SupplyUpdateParams) {
  const response = await apiClient.patch<Supply>(`Supplies/${id}`, params);
  return response.data;
}

export async function getSupplyImageUploadInfo() {
  const response = await apiClient.get<UploadInfo>(`Supplies/ImageUploadUrl`);
  return response.data;
}
