import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { ChangePasswordRequest } from 'src/app/model/security/change-password-request';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  public modelForm: FormGroup;
  public model: ChangePasswordRequest;
  public isPressed = false;
  public showPassword = false;
  public showPasswordAgain = false;

  constructor(private router: Router, private authSrevice: AuthService, private messageService: MessageService) { 
    this.model = {};
    this.modelForm = new FormGroup({
      passwordControl: new FormControl(this.model.password),
      confirmPasswordControl: new FormControl(this.model.confirmPassword)
    })
  }

  public resetClick(){
    this.isPressed = true;
    if (this.authSrevice.passwordToken){
      this.authSrevice.accessToken = this.authSrevice.passwordToken;
      this.authSrevice.passwordToken = null;
    }
    this.authSrevice.changePassword(this.model).subscribe(
      ()=>{
        this.authSrevice.accessToken = null;
        const message: Message = {
          severity: 'info', summary: 'Servicemeldung', detail: 'Dein Passwort wurde erfolgreich geändert'};
        this.messageService.add(message);
        this.isPressed = false; 
        this.router.navigate(['login']);
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
    )
  }
  public cancelClick(){
    this.authSrevice.passwordToken = null;
    this.authSrevice.accessToken = null;
    this.router.navigate(['login']); 
  }

  public get passwordType(){
    return this.showPassword ? 'text' : 'password';
  }

  public get passwordAgainType(){
    return this.showPasswordAgain ? 'text' : 'password';
  }

}
