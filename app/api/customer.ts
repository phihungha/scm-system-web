import {
  Customer,
  CustomerCreateParams,
  CustomerUpdateParams,
} from '../models/customer';
import { SimpleItemQueryParams } from '../models/general';
import apiClient from './api-client';

export async function getCustomers(params?: SimpleItemQueryParams) {
  const response = await apiClient.get<Customer[]>('Customers', { params });
  return response.data;
}

export async function getCustomer(id: number) {
  const response = await apiClient.get<Customer>(`Customers/${id}`);
  return response.data;
}

export async function createCustomer(params: CustomerCreateParams) {
  const response = await apiClient.post<Customer>('Customers', params);
  return response.data;
}

export async function updateCustomer({ id, ...params }: CustomerUpdateParams) {
  const response = await apiClient.patch<Customer>(`Customers/${id}`, params);
  return response.data;
}
