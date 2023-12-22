import {
  CreateUpdateTime,
  SoftDeletable,
  SoftDeletableParams,
} from './interfaces';

export interface ProductionFacility extends CreateUpdateTime, SoftDeletable {
  id: number;
  name: string;
  description: string;
  location: string;
  email: string;
  phoneNumber: string;
  contactPerson: string;
}

export interface ProductionFacilityParams extends SoftDeletableParams {
  location: string;
  description: string;
  email: string;
  name: string;
  phoneNumber: string;
}
