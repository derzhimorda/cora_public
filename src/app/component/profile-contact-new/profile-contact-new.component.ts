import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { ContactModel } from 'src/app/model/profile/contact';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-profile-contact-new',
  templateUrl: './profile-contact-new.component.html',
  styleUrls: ['./profile-contact-new.component.scss']
})
export class ProfileContactNewComponent {

  public modelForm: FormGroup;
  public model: ContactModel;
  public phoneAgain?: string;
  public emailAgain?: string;
  public passwordAgain?: string;
  public isPressed = false;
  public showPassword = false;
  public showPasswordAgain = false

  constructor(private router: Router, private modelService: UserService, private authService: AuthService, private sessionService: SessionService, private messageService: MessageService) { 
    this.model= {};
    this.modelForm = new FormGroup({
      phoneControl: new FormControl(this.model.cellular),
      phoneAgainControl: new FormControl(this.phoneAgain),
      emailControl: new FormControl(this.model.email),
      emailAgainControl: new FormControl(this.emailAgain),
      passwordControl: new FormControl(this.model.password),
      passwordAgainControl: new FormControl(this.passwordAgain)
    });
  }

  public registerClick(){
    this.isPressed = true;
    const errorList: string[] = [];
    if (!this.checkControl('phoneControl', 'phoneAgainControl')) {
      errorList.push('Phones must be equal');
    }
    if (!this.checkControl('emailControl', 'emailAgainControl')) {
      errorList.push('Emails must be equal');
    }
    if (!this.checkControl('passwordControl', 'passwordAgainControl')) {
      errorList.push('Passwords must be equal');
    }
    if (errorList.length > 0)
    {
      const message: Message = { severity: 'error', summary: 'Error', detail: errorList[0] };
      this.messageService.add(message);
      this.isPressed = false;

      return;
    }

    this.modelService.saveProfileContact(this.model).subscribe(
      (model)=>{
        this.isPressed = false;
        this.sessionService.activeProfile = model;
        this.sessionService.isRegistrationStarted = false;
        this.authService.accessToken = null;
        this.router.navigate(['verification']);
      },
      (error)=>{
        this.isPressed = false;
        if (error && error instanceof Array)
        {
          error.forEach(item =>{
            const message: Message = { severity: 'error', summary: 'Error', detail: item as string};
            this.messageService.add(message);
          })
        }
      }
    );
  }

  public get passwordType(){
    return this.showPassword ? 'text' : 'password';
  }

  public get passwordAgainType(){
    return this.showPasswordAgain ? 'text' : 'password';
  }
  
  private checkControl(name1: string, name2: string): boolean {
    const control1 = this.modelForm.get(name1);
    const control2 = this.modelForm.get(name2);

    return control1 && control2 && control1.value === control2.value ? true : false;
  }

  public cancelClick(){
    this.modelService.canselRegistration().subscribe(
      ()=>{
        this.sessionService.isRegistrationStarted = false;
      }
    );
    this.router.navigate(['login']);
  }
}
