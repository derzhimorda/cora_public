import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { AddressModel } from 'src/app/model/profile/address';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile-address-new',
  templateUrl: './profile-address-new.component.html',
  styleUrls: ['./profile-address-new.component.scss']
})
export class ProfileAddressNewComponent {
  @Output() changeStage: EventEmitter<number>;
  public modelForm: FormGroup;
  public model: AddressModel;
  public isPressed = false;
  
  constructor(private router: Router, private modelService: UserService, private messageService: MessageService, private sessionService: SessionService) {
    this.changeStage = new EventEmitter<number>();
    this.model = {};
    this.modelForm = new FormGroup({
      countryControl: new FormControl(this.model.country),
      regionControl: new FormControl(this.model.region),
      streetControl: new FormControl(this.model.street),
      houseControl: new FormControl(this.model.house),
      zipControl: new FormControl(this.model.zipCode),
      cityControl: new FormControl(this.model.city)
    });
  }

  public nextClick(){
    this.isPressed = true;
    this.modelService.saveProfileAddress(this.model).subscribe(
      ()=>{
        this.isPressed = false;
        this.changeStage.emit(3);
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

  public cancelClick(){
    this.modelService.canselRegistration().subscribe(
      () => {
      }
    );
    this.sessionService.isRegistrationStarted = false;
    this.router.navigate(['login']);
  }
}
