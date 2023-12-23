import { ProblemParams } from '../models/general';
import {
  PurchaseRequisition,
  PurchaseRequisitionCreateParams,
  PurchaseRequisitionQueryParams,
  PurchaseRequisitionUpdateParams,
} from '../models/purchase-requisition';
import apiClient from './api-client';

export async function getPurchaseRequisitions(
  params: PurchaseRequisitionQueryParams,
) {
  const response = await apiClient.get<PurchaseRequisition[]>(
    'PurchaseRequisitions',
    { params },
  );
  return response.data;
}

export async function getPurchaseRequisition(id: number) {
  const response = await apiClient.get<PurchaseRequisition>(
    `PurchaseRequisitions/${id}`,
  );
  return response.data;
}

export async function createPurchaseRequisition(
  params: PurchaseRequisitionCreateParams,
) {
  const response = await apiClient.post<PurchaseRequisition>(
    'PurchaseRequisitions',
    params,
  );
  return response.data;
}

export async function updatePurchaseRequisition({
  id,
  ...params
}: PurchaseRequisitionUpdateParams) {
  const response = await apiClient.patch<PurchaseRequisition>(
    `PurchaseRequisitions/${id}`,
    params,
  );
  return response.data;
}

export async function approvePurchaseRequisition(id: number) {
  const body = { approvalStatus: 'Approved' };
  const response = await apiClient.patch<PurchaseRequisition>(
    `PurchaseRequisitions/${id}`,
    body,
  );
  return response.data;
}

export async function rejectPurchaseRequisition({
  id,
  problem,
}: ProblemParams) {
  const body = { approvalStatus: 'Rejected', problem };
  const response = await apiClient.patch<PurchaseRequisition>(
    `PurchaseRequisitions/${id}`,
    body,
  );
  return response.data;
}

export const cancelPurchaseRequisition = async ({
  id,
  problem,
}: ProblemParams) => {
  const body = { status: 'Canceled', problem };
  const response = await apiClient.patch<PurchaseRequisition>(
    `PurchaseRequisitions/${id}`,
    body,
  );
  return response.data;
};
