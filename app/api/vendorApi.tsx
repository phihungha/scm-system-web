import apiClient from '../utils/client-api';
import { IVendorsResponse, VendorInput } from '../types/vendor';
import { Vendor } from '../types/requisition';

export const getAllVendors = async () => {
  const response = await apiClient.get<IVendorsResponse>(`Vendors`);
  return response.data;
};

export const getVendor = async (id: string) => {
  const response = await apiClient.get<Vendor>(`Vendors/${id}`);
  return response.data;
};

export const createVendor = async (vendor: VendorInput) => {
  const response = await apiClient.post<Vendor>(`Vendors`, vendor);
  return response.data;
};

export const updateVendor = async (id: string, vendor: VendorInput) => {
  const response = await apiClient.patch<Vendor>(`Vendors/${id}`, vendor);
  return response.data;
};
