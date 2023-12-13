import { Vendor } from './requisition';

export interface ISupplyResponse {
  vendor: Vendor;
  vendorId: string;
  id: string;
  name: string;
  description: string;
  unit: string;
  price: number;
  isActive: boolean;
  createTime: Date;
  updateTime: Date;
}

export interface ISuppliesResponse {
  status: string;
  data: {
    sales: ISupplyResponse[];
  };
}
