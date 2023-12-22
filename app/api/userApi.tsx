import {
  createUserInput,
  IUserResponse,
  IUsersResponse,
  updateUserInput,
} from '../types/user';
import apiClient from '../utils/client-api';

export const getAllUsers = async () => {
  const response = await apiClient.get<IUsersResponse>(`Users`);
  return response.data;
};

export const getUser = async (id: string) => {
  const response = await apiClient.get<IUserResponse>(`Users/${id}`);
  return response.data;
};

export const createUser = async (user: createUserInput) => {
  const response = await apiClient.post<IUserResponse>(`Users`, user);
  return response.data;
};

export const updateUser = async (id: string, user: updateUserInput) => {
  const response = await apiClient.patch<IUserResponse>(`Users/${id}`, user);
  return response.data;
};
