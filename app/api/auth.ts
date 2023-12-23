import { SignInParams } from '../models/auth';
import { User } from '../models/user';
import apiClient from './client-api';

export async function signIn(params: SignInParams) {
  const response = await apiClient.post<User>('Auth/SignIn', params);
  return response.data;
}
