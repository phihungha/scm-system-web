import { SimpleItemQueryParams } from '../models/general';
import {
  Vendor,
  VendorCreateParams,
  VendorUpdateParams,
} from '../models/vendor';
import apiClient from './api-client';

export async function getVendors(params: SimpleItemQueryParams) {
  const response = await apiClient.get<Vendor[]>('Vendors', { params });
  return response.data;
}

export async function getVendor(id: number) {
  const response = await apiClient.get<Vendor>(`Vendors/${id}`);
  return response.data;
}

export async function createVendor(params: VendorCreateParams) {
  const response = await apiClient.post<Vendor>('Vendors', params);
  return response.data;
}

export async function updateVendor({ id, ...params }: VendorUpdateParams) {
  const response = await apiClient.patch<Vendor>(`Vendors/${id}`, params);
  return response.data;
}
