import apiClient from '../utils/client-api';
import {
  IProductResponse,
  IProductsResponse,
  ProductInput,
} from '../types/product';
import fakeApiClient from '../utils/fake-api';

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

export const getAllProducts2 = async () => {
  const response = await fakeApiClient.get<IProductsResponse>(
    `fbe80f6f-d84c-4f07-a732-32d695f931cc`,
  );
  return response.data;
};

export const getProduct2 = async (id: string) => {
  const response = await fakeApiClient.get<IProductResponse>(
    `b3ea8c9e-f47e-4b6b-9337-d513bdbaf4e0`,
  );
  return response.data;
};
