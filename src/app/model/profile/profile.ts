import { AddressModel } from './address';
import { ContactModel } from './contact';
import { PersonModel } from './person';

export interface ProfileModel {
    person: PersonModel;
    address: AddressModel;
    contact: ContactModel;
    acceptAgreement: boolean;
    acceptDataShare: boolean;
}

export const newProfile: ProfileModel = {
  address: {},
  person: {},
  contact: {},
  acceptAgreement: false,
  acceptDataShare: false
}
