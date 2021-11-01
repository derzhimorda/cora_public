import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { ForgotPasswordRequest } from '../../model/security/forgot-password-request';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  public modelForm: FormGroup;
  public model: ForgotPasswordRequest = {}
  public isPressed = false;

  constructor(private router: Router, private authService: AuthService, private messageService: MessageService) {
    this.modelForm = new FormGroup({
      emailControl: new FormControl('', [Validators.required, Validators.email])
    });
  }
  cancelClick() {
    this.isPressed = false;
    this.router.navigate(['login']);
  }

  sendEmailClick() {
    this.authService.forgotPassword(this.model).subscribe(
      () => {
        this.isPressed = false;
        const message: Message = {
          severity: 'info', summary: 'Servicemeldung', detail: 'Überprüfen Sie Ihre E-Mail für weitere Anweisungen'
        };
        this.messageService.add(message);
        this.router.navigate(['login']);
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
    )
  }
}
