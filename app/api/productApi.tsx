import {
  IProductResponse,
  IProductsResponse,
  ProductInput,
} from '../types/product';
import apiClient from '../utils/client-api';

export const getAllProducts = async () => {
  const response = await apiClient.get<IProductsResponse>(`Products`);
  return response.data;
};

export const getProduct = async (id: string) => {
  const response = await apiClient.get<IProductResponse>(`Products/${id}`);
  return response.data;
};

export const createProduct = async (product: ProductInput) => {
  const response = await apiClient.post<IProductResponse>(`Products`, product);
  return response.data;
};

export const updateProduct = async (id: string, product: ProductInput) => {
  const response = await apiClient.patch<IProductResponse>(
    `Products/${id}`,
    product,
  );
  return response.data;
};
