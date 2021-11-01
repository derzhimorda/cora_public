import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { ControlConfig } from '../../model/infrastructure/control-config';
import { ValidatorBase } from '../../model/infrastructure/control-validator';
import { PersonModel } from '../../model/profile/person';
import { UserService } from '../../service/user.service';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-profile-person-edit',
  templateUrl: './profile-person-edit.component.html',
  styleUrls: ['./profile-person-edit.component.scss']
})
export class ProfilePersonEditComponent {

  public modelForm: FormGroup;
  public model: PersonModel;
  public date?: Date;
  public date1 = new Date;
  public isPressed = false;
  public genders = ['männlich', 'weiblich', 'divers'];

  constructor(private router: Router, private sessionService: SessionService, private modelService: UserService, private messageService: MessageService) {

    this.model = { ...this.sessionService.activeProfile.person };
    if (this.model.birthDate) {
      this.model.birthDate = new Date(this.model.birthDate)
    }
    this.modelForm = new FormGroup(
      {
        firstNameControl: new FormControl(this.model.firstName),
        lastNameControl: new FormControl(this.model.lastName),
        birthDateControl: new FormControl(this.model.birthDate),
        genderControl: new FormControl(this.model.gender),
      });
  }

  public saveClick() {
    this.isPressed = true;
    if (this.model.birthDate) {
      const offset = this.model.birthDate.getTimezoneOffset();
      const isoDate = this.model.birthDate.setMinutes(-offset);
      this.model.birthDate = new Date(isoDate);
    }
    this.modelService.saveProfilePerson(this.model).subscribe(
      (model) => {
        this.isPressed = false;
        this.sessionService.activeProfile = model
        this.router.navigate(['profile']);
      },
      (error) => {
        this.isPressed = false;
        if (error && error instanceof Array) {
          error.forEach(item => {
            const message: Message = { severity: 'error', summary: 'Error', detail: item as string };
            this.messageService.add(message);
          })
        }
      }
    );
  }

  public get dateRange(): string {
    const lastYear = new Date().getFullYear();
    const firstYear = lastYear - 100;

    return `${firstYear}:${lastYear}`;
  }

  public changeGender($event: any) {
    const value: string = $event.target.value;
    this.model.gender = value.split(':')[1].trim();
  }

  public isGenderSelected(gender: string): boolean{
    if (this.model.gender)
    {
      return this.model.gender === gender;
    }

    return gender === this.genders[2];
  }
}
