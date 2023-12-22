import {
  CreateUpdateTime,
  SoftDeletable,
  SoftDeletableParams,
} from './interfaces';

export interface Vendor extends CreateUpdateTime, SoftDeletable {
  contactPerson: string;
  defaultLocation: string;
  description: string;
  email: string;
  id: number;
  name: string;
  phoneNumber: string;
}

export interface VendorParams extends SoftDeletableParams {
  contactPerson: string;
  defaultLocation: string;
  description: string;
  email: string;
  name: string;
  phoneNumber: string;
}
