import apiClient from '../utils/client-api';
import { IProductResponse, IProductsResponse } from '../types/product';

export const getAllProducts = async () => {
  const response = await apiClient.get<IProductsResponse>(`Products`);
  return response.data;
};

export const getProduct = async (id: string) => {
  const response = await apiClient.get<IProductResponse>(`Products/${id}`);
  return response.data;
};

export const createProduct = async (product: IProductResponse) => {
  const response = await apiClient.post<IProductResponse>(`Products`, product);
  return response.data;
};

export const updateProduct = async ({
  id,
  product,
}: {
  id: string;
  product: IProductResponse;
}) => {
  const response = await apiClient.patch<IProductResponse>(
    `Products/${id}`,
    product,
  );
  return response.data;
};
