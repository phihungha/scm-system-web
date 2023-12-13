import { Vendor } from './requisition';

export interface IVendorResponse extends Vendor {
  email: string;
  phoneNumber: string;
}

export interface IVendorsResponse {
  status: string;
  data: {
    sales: IVendorResponse[];
  };
}
