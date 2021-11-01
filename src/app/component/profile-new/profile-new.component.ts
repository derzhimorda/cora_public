import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { PersonModel } from 'src/app/model/profile/person';
import { AuthService } from 'src/app/service/auth.service';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile-new',
  templateUrl: './profile-new.component.html',
  styleUrls: ['./profile-new.component.scss']
})
export class ProfileNewComponent {
  public stageNumber: number

  constructor(private router: Router,
    private modelService: UserService,
    private authService: AuthService,
    private messageService: MessageService,
    private sessionService: SessionService) {
      this.stageNumber = 1;
  }

  public nextClick() {
  }

  public cancelClick() {
    this.router.navigate(['login']);
  }

  public changeStage($event: number){
    this.stageNumber = $event;
  }
}
