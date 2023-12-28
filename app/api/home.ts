import { HomeInfo } from '../models/home';
import apiClient from './api-client';

export async function GetHome() {
  const response = await apiClient.get<HomeInfo>('');
  return response.data;
}
