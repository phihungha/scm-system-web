import { Config, ConfigParams } from '../types/config';
import apiClient from '../utils/client-api';

export const getConfig = async () => {
  const response = await apiClient.get<Config>('Config');
  return response.data;
};

export const setConfig = async (params: ConfigParams) => {
  const response = await apiClient.patch<Config>('Config', params);
  return response.data;
};
