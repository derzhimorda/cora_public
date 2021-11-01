import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { UserService } from 'src/app/service/user.service';
import { GeneratePinRequest } from '../../model/security/generate-pin-request';
import { LoginPinRequest } from '../../model/security/login-pin-request';
import { PinModel } from '../../model/security/pin';
import { AuthService } from '../../service/auth.service';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  public modelForm: FormGroup;
  public model: PinModel;
  public isPressed = true;

  constructor(private router: Router, private sessionService: SessionService, private authService: AuthService, private modelService: UserService, private messageService: MessageService) {
    this.model = {};
    this.modelForm = new FormGroup({
      value1Control: new FormControl(this.model.value1, Validators.required),
      value2Control: new FormControl(this.model.value2, Validators.required),
      value3Control: new FormControl(this.model.value3, Validators.required),
      value4Control: new FormControl(this.model.value4, Validators.required),
      resendButton: new FormControl('')
    });

  }
    ngOnInit(): void {
      this.generatePinCode();
    }

  public confirmClick() {
    this.isPressed = true;
    const request: LoginPinRequest = {
      cellular: this.sessionService.activeProfile?.contact?.cellular ?? '',
      email: this.sessionService.activeProfile?.contact?.email ?? '',
      pinCode: `${this.model.value1}${this.model.value2}${this.model.value3}${this.model.value4}`
    }
    this.modelService.activateProfile(request).subscribe(
      (model) => {
        this.isPressed = false;
        this.authService.accessToken = model.token;
        this.sessionService.session.lotNumber = model.lotNumber;
        this.sessionService.session.isVeryfied = true;
        this.router.navigate(['check-in']);
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
      }
    );
  }

  public resendClick() {
    this.generatePinCode();
  }

  private generatePinCode() {
    this.isPressed = true;
    const request: GeneratePinRequest = {
      cellular: this.sessionService.activeProfile?.contact?.cellular ?? '',
      email: this.sessionService.activeProfile?.contact?.email ?? '',
    }
    this.authService.generatePin(request).subscribe(
      ()=> { 
        const message: Message = {
          severity: 'info', summary: 'Servicemeldung', detail: 'Überprüfen Sie Ihren Emal auf Bestätigungscode'};
        this.messageService.add(message);
        this.isPressed = false; 
      },
      (error)=> {
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

  public changeInput(id: string){
    document.getElementById(id)?.focus();
  }
}
