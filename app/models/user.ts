import {
  CreateUpdateTime,
  SoftDeletable,
  SoftDeletableParams,
} from './general';
import { ProductionFacility } from './production-facility';

type Gender = 'Male' | 'Female' | 'Other';

type UserRoles =
  | 'Admin'
  | 'Director'
  | 'Finance'
  | 'SalesSpecialist'
  | 'SalesManager'
  | 'PurchaseSpecialist'
  | 'PurchaseManager'
  | 'ProductionPlanner'
  | 'ProductionManager'
  | 'InventorySpecialist'
  | 'InventoryManager'
  | 'LogisticsSpecialist';

export interface User extends CreateUpdateTime, SoftDeletable {
  id: string;
  userName: string;
  imageUrl?: string;
  imageName?: string;
  email: string;
  phoneNumber: string;
  name: string;
  gender: Gender;
  dateOfBirth: string;
  idCardNumber: string;
  address?: string;
  description?: string;
  roles: UserRoles[];
  productionFacilityId?: number;
  productionFacility?: ProductionFacility;
}

export interface UserCreateParams extends SoftDeletableParams {
  address?: string;
  imageName?: string;
  dateOfBirth: string;
  description?: string;
  email: string;
  gender: Gender;
  idCardNumber: string;
  name: string;
  phoneNumber: string;
  roles: UserRoles[];
  productionFacilityId?: number;
  userName: string;
  password: string;
}

export interface UserUpdateParams extends SoftDeletableParams {
  id: string;
  address?: string;
  imageName?: string;
  dateOfBirth: string;
  description?: string;
  email: string;
  gender: Gender;
  idCardNumber: string;
  name: string;
  productionFacilityId?: number;
  phoneNumber: string;
  roles: UserRoles[];
  userName: string;
}

export interface UserPasswordUpdateParams {
  id: string;
  oldPassword: string;
  newPassword: string;
}
