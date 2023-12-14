import { productionFacility } from './sales';

export interface IFacilityResponse extends productionFacility {
  email: string;
  phoneNumber: string;
  contactPerson: string;
}

export interface IFacilitiesResponse {
  status: string;
  data: {
    sales: IFacilityResponse[];
  };
}

export class FacilityInput {
  location: string;
  description: string;
  email: string;
  isActive: boolean;
  name: string;
  phoneNumber: string;
  constructor(
    location: string,
    description: string,
    email: string,
    isActive: boolean,
    name: string,
    phoneNumber: string,
  ) {
    this.location = location;
    this.description = description;
    this.email = email;
    this.isActive = isActive;
    this.name = name;
    this.phoneNumber = phoneNumber;
  }
}
