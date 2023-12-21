import apiClient from '../utils/client-api';
import {
  IFacilityResponse,
  IFacilitiesResponse,
  FacilityInput,
} from '../types/productionFacility';
import fakeApiClient from '../utils/fake-api';

export const getAllFacilities = async () => {
  const response =
    await apiClient.get<IFacilitiesResponse>(`ProductionFacilities`);
  return response.data;
};

export const getFacility = async (id: string) => {
  const response = await apiClient.get<IFacilityResponse>(
    `ProductionFacilities/${id}`,
  );
  return response.data;
};

export const createFacility = async (facility: FacilityInput) => {
  const response = await apiClient.post<IFacilityResponse>(
    `ProductionFacilities`,
    facility,
  );
  return response.data;
};

export const updateFacility = async (id: string, facility: FacilityInput) => {
  const response = await apiClient.patch<IFacilityResponse>(
    `ProductionFacilities/${id}`,
    facility,
  );
  return response.data;
};
