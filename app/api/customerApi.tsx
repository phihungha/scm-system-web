import apiClient from '../utils/client-api';
import { ICustomersResponse } from '../types/customer';
import { ICustomer } from '../types/sales';

export const getAllCustomers = async () => {
  const response = await apiClient.get<ICustomersResponse>(`Customers`);
  return response.data;
};

export const getCustomer = async (id: string) => {
  const response = await apiClient.get<ICustomer>(`Customers/${id}`);
  return response.data;
};

export const createCustomer = async (customer: ICustomer) => {
  const response = await apiClient.post<ICustomer>(`Customers`, customer);
  return response.data;
};

export const updateCustomer = async ({
  id,
  customer,
}: {
  id: string;
  customer: ICustomer;
}) => {
  const response = await apiClient.patch<ICustomer>(
    `Customers/${id}`,
    customer,
  );
  return response.data;
};
