import {
  ProductionFacility,
  ProductionFacilityCreateParams,
  ProductionFacilityUpdateParams,
} from '../models/production-facility';
import apiClient from './client-api';

export async function getProductionFacilities() {
  const response =
    await apiClient.get<ProductionFacility>(`ProductionFacilities`);
  return response.data;
}

export async function getProductionFacility(id: number) {
  const response = await apiClient.get<ProductionFacility>(
    `ProductionFacilities/${id}`,
  );
  return response.data;
}

export async function createProductionFacility(
  params: ProductionFacilityCreateParams,
) {
  const response = await apiClient.post<ProductionFacility>(
    `ProductionFacilities`,
    params,
  );
  return response.data;
}

export async function updateProductionFacility({
  id,
  ...params
}: ProductionFacilityUpdateParams) {
  const response = await apiClient.patch<ProductionFacility>(
    `ProductionFacilities/${id}`,
    params,
  );
  return response.data;
}
