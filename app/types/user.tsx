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

export class createUserInput {
  address: string;
  dateOfBirth: Date;
  description: string;
  email: string;
  gender: string;
  idCardNumber: string;
  isActive: boolean;
  name: string;
  phoneNumber: string;
  roles: string[];
  userName: string;
  password: string;

  constructor(
    address: string,
    dateOfBirth: Date,
    description: string,
    email: string,
    gender: string,
    idCardNumber: string,
    isActive: boolean,
    name: string,
    phoneNumber: string,
    roles: string[],
    userName: string,
    password: string,
  ) {
    this.address = address;
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.gender = gender;
    this.description = description;
    this.idCardNumber = idCardNumber;
    this.isActive = isActive;
    this.phoneNumber = phoneNumber;
    this.roles = roles;
    this.userName = userName;
    this.password = password;
  }
}

export class updateUserInput {
  address: string;
  dateOfBirth: Date;
  description: string;
  email: string;
  gender: string;
  idCardNumber: string;
  isActive: boolean;
  name: string;
  productionFacilityId: number;
  phoneNumber: string;
  roles: string[];
  userName: string;

  constructor(
    address: string,
    dateOfBirth: Date,
    description: string,
    email: string,
    gender: string,
    idCardNumber: string,
    isActive: boolean,
    name: string,
    phoneNumber: string,
    roles: string[],
    userName: string,
    productionFacilityId: number,
  ) {
    this.address = address;
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.gender = gender;
    this.description = description;
    this.idCardNumber = idCardNumber;
    this.isActive = isActive;
    this.phoneNumber = phoneNumber;
    this.roles = roles;
    this.userName = userName;
    this.productionFacilityId = productionFacilityId;
  }
}
