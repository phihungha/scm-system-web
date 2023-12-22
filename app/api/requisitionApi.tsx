import {
  ApproveInput,
  CancelInput,
  IRequisitionResponse,
  IRequisitionsResponse,
  RejectInput,
  requisitionCreateInput,
  requisitionUpdateInput,
} from '../types/requisition';
import apiClient from '../utils/client-api';

export const getAllRequisitions = async () => {
  const response =
    await apiClient.get<IRequisitionsResponse>(`PurchaseRequisitions`);
  return response.data;
};

export const getRequisition = async (id: string) => {
  const response = await apiClient.get<IRequisitionResponse>(
    `PurchaseRequisitions/${id}`,
  );
  return response.data;
};

export const createRequisition = async (
  requisition: requisitionCreateInput,
) => {
  const response = await apiClient.post<IRequisitionResponse>(
    `PurchaseRequisitions`,
    requisition,
  );
  return response.data;
};

export const updateRequisition = async (
  id: string,
  requisition: requisitionUpdateInput,
) => {
  const response = await apiClient.patch<IRequisitionResponse>(
    `PurchaseRequisitions/${id}`,
    requisition,
  );
  return response.data;
};

export const approveRequisition = async (id: string) => {
  const approve = new ApproveInput('Approved');
  const response = await apiClient.patch<IRequisitionResponse>(
    `PurchaseRequisitions/${id}`,
    approve,
  );
  return response.data;
};

export const rejectRequisition = async (id: string, problem: string) => {
  const reject = new RejectInput(problem);
  const response = await apiClient.patch<IRequisitionResponse>(
    `PurchaseRequisitions/${id}`,
    reject,
  );
  return response.data;
};

export const cancelRequisition = async (id: string, problem: string) => {
  const cancel = new CancelInput(problem);
  const response = await apiClient.patch<IRequisitionResponse>(
    `PurchaseRequisitions/${id}`,
    cancel,
  );
  return response.data;
};
