import {
  CreateUpdateTime,
  SoftDeletable,
  SoftDeletableParams,
} from './general';
import { ProductionFacility } from './production-facility';

type Gender = 'Male' | 'Female' | 'Other';

export interface User extends CreateUpdateTime, SoftDeletable {
  id: string;
  userName: string;
  imageUrl?: string;
  imageName?: string;
  email?: string;
  phoneNumber?: string;
  name: string;
  gender: Gender;
  dateOfBirth: Date;
  idCardNumber: string;
  address: string;
  roles: string[];
  productionFacilityId?: number;
  productionFacility?: ProductionFacility;
}

export interface UserCreateParams extends SoftDeletableParams {
  address: string;
  imageName?: string;
  dateOfBirth: Date;
  description: string;
  email: string;
  gender: Gender;
  idCardNumber: string;
  name: string;
  phoneNumber: string;
  roles: string[];
  productionFacilityId?: number;
  userName: string;
  password: string;
}

export interface UserUpdateParams extends SoftDeletableParams {
  id: number;
  address: string;
  imageName?: string;
  dateOfBirth: Date;
  description: string;
  email: string;
  gender: Gender;
  idCardNumber: string;
  name: string;
  productionFacilityId?: number;
  phoneNumber: string;
  roles: string[];
  userName: string;
}

export interface UserPasswordUpdateParams {
  oldPassword: string;
  newPassword: string;
}
