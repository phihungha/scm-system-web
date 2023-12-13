import { Vendor } from './requisition';

export interface IVendorsResponse {
  status: string;
  data: {
    sales: Vendor[];
  };
}
