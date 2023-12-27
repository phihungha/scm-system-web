import {
  ProductionReport,
  PurchaseReport,
  ReportQueryParams,
  SalesReport,
} from '../models/reports';
import apiClient from './api-client';

export async function getSalesReport(params: ReportQueryParams) {
  const response = await apiClient.get<SalesReport>('Reports/Sales', {
    params,
  });
  return response.data;
}

export async function getPurchaseReport(params: ReportQueryParams) {
  const response = await apiClient.get<PurchaseReport>('Reports/Purchase', {
    params,
  });
  return response.data;
}

export async function getProductionReport(params: ReportQueryParams) {
  const response = await apiClient.get<ProductionReport>('Reports/Production', {
    params,
  });
  return response.data;
}
