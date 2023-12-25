import { SoftDeletableParams } from './general';

export interface Customer {
  contactPerson: string;
  createTime: Date;
  defaultLocation: string;
  description: string;
  email: string;
  id: number;
  isActive: boolean;
  name: string;
  phoneNumber: string;
  updateTime: Date;
}

export interface CustomerCreateParams extends SoftDeletableParams {
  contactPerson: string;
  defaultLocation: string;
  description: string;
  email: string;
  name: string;
  phoneNumber: string;
}

export interface CustomerUpdateParams extends CustomerCreateParams {
  id: number;
}
