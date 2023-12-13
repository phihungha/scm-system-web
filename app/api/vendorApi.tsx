import apiClient from '../utils/client-api';
import { IVendorResponse, IVendorsResponse } from '../types/vendor';

export const getAllVendors = async () => {
  const response = await apiClient.get<IVendorsResponse>(`Vendors`);
  return response.data;
};

export const getVendor = async (id: string) => {
  const response = await apiClient.get<IVendorResponse>(`Vendors/${id}`);
  return response.data;
};

export const createVendor = async (vendor: IVendorResponse) => {
  const response = await apiClient.post<IVendorResponse>(`Vendors`, vendor);
  return response.data;
};

export const updateVendor = async ({
  id,
  vendor,
}: {
  id: string;
  vendor: IVendorResponse;
}) => {
  const response = await apiClient.patch<IVendorResponse>(
    `Vendors/${id}`,
    vendor,
  );
  return response.data;
};
