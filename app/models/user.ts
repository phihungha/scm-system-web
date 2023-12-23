import {
  CreateUpdateTime,
  SoftDeletable,
  SoftDeletableParams,
} from './general';

type Gender = 'Male' | 'Female' | 'Other';

export interface User extends CreateUpdateTime, SoftDeletable {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  name: string;
  gender: Gender;
  dateOfBirth: Date;
  idCardNumber: string;
  address: string;
}

export interface UserCreateParams extends SoftDeletableParams {
  address: string;
  dateOfBirth: Date;
  description: string;
  email: string;
  gender: Gender;
  idCardNumber: string;
  name: string;
  phoneNumber: string;
  roles: string[];
  userName: string;
  password: string;
}

export interface UserUpdateParams extends SoftDeletableParams {
  address: string;
  dateOfBirth: Date;
  description: string;
  email: string;
  gender: Gender;
  idCardNumber: string;
  name: string;
  productionFacilityId: number;
  phoneNumber: string;
  roles: string[];
  userName: string;
}
