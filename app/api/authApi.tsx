import { GenericResponse, LoginInput } from "../types/sales";
import apiClient from "../utils/client-api";

export const signInUser = async (user: LoginInput) => {
    const response = await apiClient.post<GenericResponse>('Auth/SignIn', user);
    return response.data;
  };