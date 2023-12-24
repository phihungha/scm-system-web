import { SimpleItemQueryParams } from '../models/general';
import {
  Product,
  ProductCreateParams,
  ProductUpdateParams,
} from '../models/product';
import apiClient from './api-client';

export async function getProducts(params?: SimpleItemQueryParams) {
  const response = await apiClient.get<Product[]>('Products', { params });
  return response.data;
}

export async function getProduct(id: number) {
  const response = await apiClient.get<Product[]>(`Products/${id}`);
  return response.data;
}

export async function createProduct(params: ProductCreateParams) {
  const response = await apiClient.post<Product[]>('Products', params);
  return response.data;
}

export async function updateProduct({ id, ...params }: ProductUpdateParams) {
  const response = await apiClient.patch<Product[]>(`Products/${id}`, params);
  return response.data;
}
