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

export interface CustomerParams extends SoftDeletableParams {
  contactPerson: string;
  defaultLocation: string;
  description: string;
  email: string;
  name: string;
  phoneNumber: string;
}
