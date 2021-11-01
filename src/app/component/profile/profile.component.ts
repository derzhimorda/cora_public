import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../service/session.service';
import { ProfileModel } from 'src/app/model/profile/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  public model?: ProfileModel;
  public password ='';

  constructor(private router: Router, private sessionService: SessionService) {
    
  }
    ngOnInit(): void {
      this.model = this.sessionService.activeProfile;
      this.setPassword();
    }

  public cancelClick() {
    this.router.navigate(['check-in']);
  }

  private setPassword(){
    const password = this.model?.contact.password;
    if (password && password !== undefined) {
      for(let i=0; i<password.length; i++) {
        this.password += '*';
      }
    }
  }
}
