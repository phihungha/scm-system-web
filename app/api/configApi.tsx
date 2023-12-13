import apiClient from '../utils/client-api';
import { IConfigResponse } from '../types/config';

export const getConfig = async () => {
  const response = await apiClient.get<IConfigResponse>(`Config`);
  return response.data;
};

export const setConfig = async (config: IConfigResponse) => {
  const response = await apiClient.patch<IConfigResponse>(`Config`, config);
  return response.data;
};
