import { IUser } from './sales';

export interface IUserResponse extends IUser {
  roles: string[];
  description: string;
}

export interface IUsersResponse {
  status: string;
  data: {
    sales: IUserResponse[];
  };
}
