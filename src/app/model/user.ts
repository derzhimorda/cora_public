export interface UserModel {
  title?: string;
  cellular: string;
  email: string;
  phone?: string;
  skype?: string;
  firstName: string;
  lastName: string;
  birthDate?: Date;
  country: string;
  zipCode: string;
  region: string;
  street: string;
  house: string;
  building?: string;
  floor?: string;
  flat?: string;
  city: string;
  password: string;
  acceptAgreement: boolean;
  acceptDataShare: boolean;
}

export const newUser: UserModel = {
  cellular: '',
  firstName: '',
  lastName: '',
  country: '',
  region: '',
  street: '',
  house: '',
  zipCode: '',
  city: '',
  email: '',
  password: '',
  acceptAgreement: false,
  acceptDataShare: false,
}
