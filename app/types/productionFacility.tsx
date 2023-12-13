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
