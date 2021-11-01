import { Injectable } from '@angular/core';
import { PersonModel } from '../model/profile/person';
import { newProfile, ProfileModel } from '../model/profile/profile';
import { SessionModel } from '../model/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private profile: ProfileModel;
  private sessonInfo: SessionModel;
  private vaccineGuid?: string;
  private agreementChecked = false;
  private dataShareChecked = false;
  private registrationStarted = false;
  private newPersonModel: PersonModel;

  constructor() {
    this.profile = newProfile;
    this.sessonInfo = { isVeryfied: false, isCheckedIn: false };
    this.newPersonModel = {};
  }

  public get session(): SessionModel {
    return this.sessonInfo;
  }

  public get activeProfile(): ProfileModel{
    return this.profile;
  }

  public set activeProfile(profile: ProfileModel) {
    this.profile = profile;
  }

  public get userVaccineGuid(): string|undefined{
    return this.vaccineGuid;
  }

  public set userVaccineGuid(guid:string|undefined) {
    this.vaccineGuid = guid;
  }

  public get isAgreementChecked(): boolean {
    return this.agreementChecked;
  }

  public set isAgreementChecked(value: boolean){
    this.agreementChecked = value;
  }

  public get isDataShareChecked(): boolean {
    return this.dataShareChecked;
  }

  public set isDataShareChecked(value: boolean){
    this.dataShareChecked = value;
  }

  public get signupPersonModel(): PersonModel {
    return this.newPersonModel;
  }

  public set signupPersonModel(value: PersonModel){
    this.newPersonModel = value;
  }

  public clearSession() {
    this.profile = newProfile;
    this.sessonInfo = { isVeryfied: false, isCheckedIn: false };
  }

  public get isRegistrationStarted(): boolean {
    return this.registrationStarted;
  }

  public set isRegistrationStarted(value: boolean){
    this.registrationStarted = value;
  }
}
