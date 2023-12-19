import apiClient from '../utils/client-api';
import {
  IFacilityResponse,
  IFacilitiesResponse,
  FacilityInput,
} from '../types/productionFacility';
import fakeApiClient from '../utils/fake-api';

export const getAllFacilities = async () => {
  const response = await apiClient.get<IFacilitiesResponse>(`Customers`);
  return response.data;
};

export const getFacility = async (id: string) => {
  const response = await apiClient.get<IFacilityResponse>(`Customers/${id}`);
  return response.data;
};

export const createFacility = async (facility: FacilityInput) => {
  const response = await apiClient.post<IFacilityResponse>(
    `Customers`,
    facility,
  );
  return response.data;
};

export const updateFacility = async (id: string, facility: FacilityInput) => {
  const response = await apiClient.patch<IFacilityResponse>(
    `Customers/${id}`,
    facility,
  );
  return response.data;
};

export const getAllFacilities2 = async () => {
  const response = await fakeApiClient.get<IFacilitiesResponse>(
    `27b7cca5-655f-40b1-9d75-ee8c4c9ea421`,
  );
  return response.data;
};
