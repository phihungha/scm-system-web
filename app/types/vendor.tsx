import { Vendor } from './requisition';

export interface IVendorsResponse {
  status: string;
  data: {
    sales: Vendor[];
  };
}

export class customerVendorInput {
  constructor(
    public contactPerson: string,
    public defaultLocation: string,
    public description: string,
    public email: string,
    public isActive: boolean,
    public name: string,
    public phoneNumber: string,
  ) {}
}
