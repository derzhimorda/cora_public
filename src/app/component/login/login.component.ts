import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';
import { ControlConfig } from '../../model/infrastructure/control-config';
import { ValidatorBase } from '../../model/infrastructure/control-validator';
import { LoginRequestModel } from '../../model/security/login-request';
import { AuthService } from '../../service/auth.service';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public rememberMe: string[];
  public modelForm: FormGroup;
  public model: LoginRequestModel;
  public isPressed = false;
  public showPassword = false;

  private controlConfigArray: ControlConfig[];

  constructor(private authService: AuthService, private profileService: UserService, private sessionService: SessionService, private router: Router, private messageService: MessageService) {
    this.model = {
      name: '',
      password: '',
      isRemember: false
    }
    this.rememberMe = [];
    this.modelForm = new FormGroup({
      loginControl: new FormControl(this.model.name, [Validators.required]),
      passwordControl: new FormControl(this.model.password, [Validators.required]),
      rememberMeControl: new FormControl('')
    });
    this.controlConfigArray = [
      { key: 'loginControl', validatorList: [ValidatorBase.requiredValidator('Login ist leer')] },
      { key: 'passwordControl', validatorList: [ValidatorBase.requiredValidator('Passwort ist leer')]},
    ];
  }
  ngOnInit(): void {
    if (this.sessionService.isRegistrationStarted){
      this.profileService.canselRegistration().subscribe(
        () => {
          this.sessionService.isRegistrationStarted = false;
        }
      );
    }
  }

  public loginClick() {
    this.isPressed = true;
    if (!this.isFormValid) {
      this.isPressed = false;
      return;
    }
    if (this.rememberMe.length > 0) {
      this.model.isRemember = true;
    }
    this.authService.login(this.model)
      .pipe(tap((response) => {
        this.sessionService.session.isCheckedIn = response.checked;
        this.sessionService.session.lotNumber = response.lotNumber;
        this.profileService.getProfile().subscribe(
          (model) => { this.sessionService.activeProfile = model }
        )
      }))
      .subscribe(
      (response) => {
        if (!response.verified) {
          this.router.navigate(['verification']);
        } 
        else {
          const path = response.checked ? 'check-out' : 'check-in';
          this.router.navigate([path]);
        }
      },
        (error) => {
          this.isPressed = false;
          if (error && error instanceof Array)
          {
            error.forEach(item =>{
              const message: Message = { severity: 'error', summary: 'Error', detail: item as string};
              this.messageService.add(message);
            })
          }
      },
    );
  }

  public get passwordType(){
    return this.showPassword ? 'text' : 'password';
  }
  
  private get isFormValid(): boolean {
    const messageList: Message[] = [];

    this.controlConfigArray.forEach(config => {
      config.validatorList?.forEach(validator => {
        const error = validator.validate(this.modelForm.get(config.key), '');
        if (error !== null) {
          const message: Message = { severity: 'error', summary: 'Error', detail: error }
          messageList.push(message);
        }
      })
    })

    if (messageList.length > 0) {
      this.messageService.addAll(messageList);
      return false;
    }
    return true;
  }
}
