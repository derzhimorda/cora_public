import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivateProfileRequest } from '../model/profile/activate-profile-request';
import { AddressModel } from '../model/profile/address';
import { ContactModel } from '../model/profile/contact';
import { PersonModel } from '../model/profile/person';
import { ProfileModel } from '../model/profile/profile';
import { LoginResponseModel } from '../model/security/login-response';
import { TokenModel } from '../model/security/token';
import { VaccinneDetailsModel } from '../model/user/vaccinne-details';
import { VaccinneListModel } from '../model/user/vaccinne-list';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  public getProfile(): Observable<ProfileModel> {
    return this.callGet('profile');
  }

  public getVaccineListModel(){
    return this.callGet<VaccinneListModel>('vaccination/card');
  }

  public getVaccineDetailsModel(guid: string){
    const path = `vaccination/${guid}`;
    return this.callGet<VaccinneDetailsModel>(path);
  }

  public registerProfile(model: PersonModel) {
    return this.callPost<PersonModel,TokenModel>(model, 'profile/register');
  }

  public activateProfile(model: ActivateProfileRequest) {
    return this.callPost<ActivateProfileRequest,LoginResponseModel>(model, 'profile/activate');
  }

  public saveProfilePerson(model: PersonModel) {
    return this.callPut<PersonModel, ProfileModel>(model, 'profile/save/person');
  }

  public saveProfileAddress(model: AddressModel){
    return this.callPut<AddressModel, ProfileModel>(model, 'profile/save/address');
  }

  public saveProfileContact(model: ContactModel){
    return this.callPut<ContactModel, ProfileModel>(model, 'profile/save/contact');
  }

  public canselRegistration(){
    return this.callDelete('profile/register/cancel');
  }

  protected get controller(): string {
    return 'api/user'
  }
}
