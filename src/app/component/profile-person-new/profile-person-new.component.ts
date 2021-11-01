import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { PersonModel } from 'src/app/model/profile/person';
import { AuthService } from 'src/app/service/auth.service';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile-person-new',
  templateUrl: './profile-person-new.component.html',
  styleUrls: ['./profile-person-new.component.scss']
})
export class ProfilePersonNewComponent {
  @Output() changeStage: EventEmitter<number>;
  public modelForm: FormGroup;
  public model: PersonModel;
  public acceptAgreement = false;
  public acceptSharedData = false;
  public isPressed = false;
  public genders = ['männlich', 'weiblich', 'divers'];

  constructor(private router: Router,
    private modelService: UserService,
    private authService: AuthService,
    private messageService: MessageService,
    private sessionService: SessionService) {
      this.changeStage = new EventEmitter<number>();
      this.model = this.sessionService.signupPersonModel;
      this.acceptAgreement = this.sessionService.isAgreementChecked;
      this.acceptSharedData = this.sessionService.isDataShareChecked;
      this.modelForm = new FormGroup({
        firstNameControl: new FormControl(this.model.firstName),
        lastNameControl: new FormControl(this.model.lastName),
        genderControl: new FormControl(this.model.gender),
        birthDateControl: new FormControl(this.model.birthDate),
        acceptAgreementControl: new FormControl(this.acceptAgreement),
        acceptDataShareControl: new FormControl(this.acceptSharedData)
      });
  }

  public nextClick() {
    this.isPressed = true;
    if (this.model.birthDate) {
      const offset = this.model.birthDate.getTimezoneOffset();
      const isoDate = this.model.birthDate.setMinutes(-offset);
      this.model.birthDate = new Date(isoDate);
    }
    this.model.isAcceptAgreement = this.acceptAgreement;
    this.model.isAcceptSharedData = this.acceptSharedData;
    this.modelService.registerProfile(this.model).subscribe(
      (response) => {
        this.isPressed = false;
        this.authService.accessToken = response.token;
        this.sessionService.isAgreementChecked = false;
        this.sessionService.isDataShareChecked = false;
        this.sessionService.isRegistrationStarted = true;
        this.sessionService.signupPersonModel = {};
        this.changeStage.emit(2);
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

  public cancelClick() {
    this.sessionService.isAgreementChecked = false;
    this.sessionService.isDataShareChecked = false;
    this.sessionService.signupPersonModel = {};
    this.router.navigate(['login']);    
  }

  public get dateRange(): string {
    const lastYear = new Date().getFullYear();
    const firstYear = lastYear - 100;

    return `${firstYear}:${lastYear}`;
  }

  public redirectClick(path:string){
    this.sessionService.isAgreementChecked = this.acceptAgreement;
    this.sessionService.isDataShareChecked = this.acceptSharedData;
    this.router.navigate([path]);
  }
}
