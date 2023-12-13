import { ICustomer } from './sales';

export interface ICustomersResponse {
  status: string;
  data: {
    sales: ICustomer[];
  };
}
