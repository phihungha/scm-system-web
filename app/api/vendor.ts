import { Vendor, VendorParams } from '../models/vendor';
import apiClient from './client-api';

export async function getVendors() {
  const response = await apiClient.get<Vendor>(`Vendors`);
  return response.data;
}

export async function getVendor(id: number) {
  const response = await apiClient.get<Vendor>(`Vendors/${id}`);
  return response.data;
}

export async function createVendor(params: VendorParams) {
  const response = await apiClient.post<Vendor>(`Vendors`, params);
  return response.data;
}

export async function updateVendor(id: number, params: VendorParams) {
  const response = await apiClient.patch<Vendor>(`Vendors/${id}`, params);
  return response.data;
}
