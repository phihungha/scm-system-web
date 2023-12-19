import apiClient from '../utils/client-api';
import { ConfigInput, IConfigResponse } from '../types/config';
import fakeApiClient from '../utils/fake-api';

export const getConfig = async () => {
  const response = await apiClient.get<IConfigResponse>(`Config`);
  return response.data;
};

export const setConfig = async (config: ConfigInput) => {
  const response = await apiClient.patch<IConfigResponse>(`Config`, config);
  return response.data;
};

export const getConfig2 = async () => {
  const response = await fakeApiClient.get<IConfigResponse>(
    `91a90b9f-8a9f-45da-a3ee-ff3011adb61f`,
  );
  return response.data;
};
