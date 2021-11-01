import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent {

  constructor(private sessionService: SessionService, private router: Router) { 
    this.sessionService.isAgreementChecked = false;
  }

  public confirmClick(){
    this.sessionService.isAgreementChecked = true;
    this.router.navigate(['profile/new']);
  }

  public cancelClick(){
    this.sessionService.isAgreementChecked = false;
    this.router.navigate(['profile/new']);
  }
}
