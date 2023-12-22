import { User } from '../models/user';
import apiClient from './client-api';

export async function signInUser(userName: string, password: string) {
  const body = { userName, password };
  const response = await apiClient.post<User>('Auth/SignIn', body);
  return response.data;
}
