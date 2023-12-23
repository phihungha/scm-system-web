import { SimpleItemQueryParams } from '../models/general';
import { User, UserCreateParams, UserUpdateParams } from '../models/user';
import apiClient from './client-api';

export async function getUsers(params: SimpleItemQueryParams) {
  const response = await apiClient.get<User>('Users', { params });
  return response.data;
}

export async function getUser(id: string) {
  const response = await apiClient.get<User>(`Users/${id}`);
  return response.data;
}

export async function createUser(params: UserCreateParams) {
  const response = await apiClient.post<User>(`Users`, params);
  return response.data;
}

export async function updateUser({ id, ...params }: UserUpdateParams) {
  const response = await apiClient.patch<User>(`Users/${id}`, params);
  return response.data;
}
