import { Customer, CustomerParams } from '../models/customer';
import apiClient from '../utils/client-api';

export async function getCustomers() {
  const response = await apiClient.get<Customer[]>('Customers');
  return response.data;
}

export async function getCustomer(id: number) {
  const response = await apiClient.get<Customer>(`Customers/${id}`);
  return response.data;
}

export async function createCustomer(params: CustomerParams) {
  const response = await apiClient.post<Customer>(`Customers`, params);
  return response.data;
}

export async function updateCustomer(id: number, customer: CustomerParams) {
  const response = await apiClient.patch<Customer>(`Customers/${id}`, customer);
  return response.data;
}
