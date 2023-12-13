import apiClient from '../utils/client-api';
import {
  IFacilityResponse,
  IFacilitiesResponse,
} from '../types/productionFacility';

export const getAllFacilities = async () => {
  const response = await apiClient.get<IFacilitiesResponse>(`Customers`);
  return response.data;
};

export const getFacility = async (id: string) => {
  const response = await apiClient.get<IFacilityResponse>(`Customers/${id}`);
  return response.data;
};

export const createFacility = async (facility: IFacilityResponse) => {
  const response = await apiClient.post<IFacilityResponse>(
    `Customers`,
    facility,
  );
  return response.data;
};

export const updateFacility = async ({
  id,
  facility,
}: {
  id: string;
  facility: IFacilityResponse;
}) => {
  const response = await apiClient.patch<IFacilityResponse>(
    `Customers/${id}`,
    facility,
  );
  return response.data;
};
