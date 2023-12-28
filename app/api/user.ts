import { SimpleItemQueryParams, UploadInfo } from '../models/general';
import {
  User,
  UserCreateParams,
  UserPasswordUpdateParams,
  UserUpdateParams,
} from '../models/user';
import apiClient from './api-client';

export async function getUsers(params?: SimpleItemQueryParams) {
  const response = await apiClient.get<User[]>('Users', { params });
  return response.data;
}

export async function getUser(id: string) {
  const response = await apiClient.get<User>(`Users/${id}`);
  return response.data;
}

export async function createUser(params: UserCreateParams) {
  const response = await apiClient.post<User>('Users', params);
  return response.data;
}

export async function updateUser({ id, ...params }: UserUpdateParams) {
  const response = await apiClient.patch<User>(`Users/${id}`, params);
  return response.data;
}

export async function updatePassword({
  id,
  ...params
}: UserPasswordUpdateParams) {
  await apiClient.put<User>(`Users/${id}`, params);
}

export async function getUserImageUploadInfo() {
  const response = await apiClient.get<UploadInfo>(`Users/ImageUploadUrl`);
  return response.data;
}
