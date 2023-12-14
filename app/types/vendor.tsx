import { Vendor } from './requisition';

export interface IVendorsResponse {
  status: string;
  data: {
    sales: Vendor[];
  };
}

export class customerVendorInput {
  contactPerson: string;
  defaultLocation: string;
  description: string;
  email: string;
  isActive: boolean;
  name: string;
  phoneNumber: string;
  constructor(
    contactPerson: string,
    defaultLocation: string,
    description: string,
    email: string,
    isActive: boolean,
    name: string,
    phoneNumber: string,
  ) {
    this.contactPerson = contactPerson;
    this.defaultLocation = defaultLocation;
    this.description = description;
    this.email = email;
    this.isActive = isActive;
    this.name = name;
    this.phoneNumber = phoneNumber;
  }
}
