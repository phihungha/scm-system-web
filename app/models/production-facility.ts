import {
  CreateUpdateTime,
  SoftDeletable,
  SoftDeletableParams,
} from './general';

export interface ProductionFacility extends CreateUpdateTime, SoftDeletable {
  id: number;
  name: string;
  description: string;
  location: string;
  email: string;
  phoneNumber: string;
}

export interface ProductionFacilityCreateParams extends SoftDeletableParams {
  location: string;
  description: string;
  email: string;
  name: string;
  phoneNumber: string;
}

export interface ProductionFacilityUpdateParams
  extends ProductionFacilityCreateParams {
  id: number;
}
