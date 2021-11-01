import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { CheckinModel } from '../../model/checkin';
import { AuthService } from '../../service/auth.service';
import { GuestService } from '../../service/guest.service';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit{

  public isPressed = false;
  public model: CheckinModel = {
    name: '',
    address: '',
    city: '',
    zipCode: '',
    timeWork: {
      hours: 0,
      minutes: 0
    },
  };
  constructor(private router: Router, private modelService: GuestService, private sessionService: SessionService, private messageService: MessageService) { }
    ngOnInit(): void {
      this.isPressed = true;
      this.modelService.getLocation().subscribe(
        (model) => { 
          this.isPressed = false; 
          this.model = model 
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

  checkOutClick() {
    this.isPressed = true;
    this.modelService.checkOut().subscribe(
      () => {
        this.isPressed = false;
        this.sessionService.session.isCheckedIn = false;
        this.router.navigate(['check-in']);
      },
      (error)=>{
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
}
