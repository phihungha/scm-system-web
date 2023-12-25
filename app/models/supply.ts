import {
  CreateUpdateTime,
  SoftDeletable,
  SoftDeletableParams,
} from './general';
import { Vendor } from './vendor';

export interface Supply extends CreateUpdateTime, SoftDeletable {
  vendor: Vendor;
  vendorId: number;
  id: number;
  name: string;
  description: string;
  unit: string;
  price: number;
}

export interface SupplyCreateParams extends SoftDeletableParams {
  vendorId: number;
  expirationMonth: number;
  name: string;
  price: number;
  unit: string;
  description: string;
}

export interface SupplyUpdateParams extends SupplyCreateParams {
  id: number;
}
