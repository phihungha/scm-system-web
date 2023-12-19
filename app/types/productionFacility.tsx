import { productionFacility } from './sales';

export class IFacilityResponse {
  id: number;
  name: string;
  description: string;
  location: string;
  isActive: boolean;
  createTime: Date;
  updateTime: Date;
  email: string;
  phoneNumber: string;
  contactPerson: string;
  constructor(
    id: string,
    name: string,
    description: string,
    location: string,
    isActive: boolean,
    createTime: Date,
    updateTime: Date,
    email: string,
    phoneNumber: string,
    contactPerson: string,
  ) {
    this.contactPerson = contactPerson;
    this.createTime = createTime;
    this.location = location;
    this.phoneNumber = phoneNumber;
    this.updateTime = updateTime;
    this.name = name;
    this.email = email;
    this.isActive = isActive;
    this.id = id;
    this.description = description;
  }
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
