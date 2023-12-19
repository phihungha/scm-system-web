import apiClient from '../utils/client-api';
import { ICustomersResponse } from '../types/customer';
import { ICustomer } from '../types/sales';
import { customerVendorInput } from '../types/vendor';
import fakeApiClient from '../utils/fake-api';

export const getAllCustomers = async () => {
  const response = await apiClient.get<ICustomersResponse>(`Customers`);
  return response.data;
};

export const getCustomer = async (id: string) => {
  const response = await apiClient.get<ICustomer>(`Customers/${id}`);
  return response.data;
};

export const createCustomer = async (customer: customerVendorInput) => {
  const response = await apiClient.post<ICustomer>(`Customers`, customer);
  return response.data;
};

export const updateCustomer = async (
  id: string,
  customer: customerVendorInput,
) => {
  const response = await apiClient.patch<ICustomer>(
    `Customers/${id}`,
    customer,
  );
  return response.data;
};

export const getAllCustomers2 = async () => {
  const response = await fakeApiClient.get<ICustomersResponse>(
    `e8ca9969-723b-47a5-9a3e-a527c2123171`,
  );
  return response.data;
};
