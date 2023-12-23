import {
  CreateUpdateTime,
  SoftDeletable,
  SoftDeletableParams,
} from './general';

export interface Vendor extends CreateUpdateTime, SoftDeletable {
  contactPerson: string;
  defaultLocation: string;
  description: string;
  email: string;
  id: number;
  name: string;
  phoneNumber: string;
}

export interface VendorCreateParams extends SoftDeletableParams {
  contactPerson: string;
  defaultLocation: string;
  description: string;
  email: string;
  name: string;
  phoneNumber: string;
}

export interface VendorUpdateParams extends VendorCreateParams {
  id: number;
}
