import { SimpleItemQueryParams } from '../models/general';
import {
  ProductionFacility,
  ProductionFacilityCreateParams,
  ProductionFacilityUpdateParams,
} from '../models/production-facility';
import apiClient from './api-client';

export async function getProductionFacilities(params: SimpleItemQueryParams) {
  const response = await apiClient.get<ProductionFacility[]>(
    'ProductionFacilities',
    { params },
  );
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
    'ProductionFacilities',
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
