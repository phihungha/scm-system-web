import { Config, ConfigParams } from '../models/config';
import apiClient from './api-client';

export async function getConfig() {
  const response = await apiClient.get<Config>('Config');
  return response.data;
}

export async function setConfig(params: ConfigParams) {
  const response = await apiClient.patch<Config>('Config', params);
  return response.data;
}
