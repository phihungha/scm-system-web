import { Product, ProductParams } from '../models/product';
import apiClient from '../utils/client-api';

export async function getProducts() {
  const response = await apiClient.get<Product[]>('Products');
  return response.data;
}

export async function getProduct(id: number) {
  const response = await apiClient.get<Product[]>(`Products/${id}`);
  return response.data;
}

export async function createProduct(params: ProductParams) {
  const response = await apiClient.post<Product[]>(`Products`, params);
  return response.data;
}

export async function updateProduct(id: number, params: ProductParams) {
  const response = await apiClient.patch<Product[]>(`Products/${id}`, params);
  return response.data;
}
