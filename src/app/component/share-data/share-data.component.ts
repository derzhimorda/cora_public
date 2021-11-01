import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-share-data',
  templateUrl: './share-data.component.html',
  styleUrls: ['./share-data.component.scss']
})
export class ShareDataComponent {

  constructor(private sessionService: SessionService, private router: Router) { 
    this.sessionService.isDataShareChecked = false;
  }

  public confirmClick(){
    this.sessionService.isDataShareChecked = true;
    this.router.navigate(['profile/new']);
  }

  public cancelClick(){
    this.sessionService.isDataShareChecked = false;
    this.router.navigate(['profile/new']);
  }
}
