import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { AddressModel, newAddress } from 'src/app/model/profile/address';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-profile-address-edit',
  templateUrl: './profile-address-edit.component.html',
  styleUrls: ['./profile-address-edit.component.scss']
})
export class ProfileAddressEditComponent {
  public modelForm: FormGroup;
  public model: AddressModel;
  public isPressed = false;

  constructor(private router: Router, private sessionService: SessionService, private modelService: UserService, private messageService: MessageService) {

    this.model = { ...this.sessionService.activeProfile.address };
    this.modelForm = new FormGroup({
      countryControl: new FormControl(this.model.country),
      regionControl: new FormControl(this.model.region),
      streetControl: new FormControl(this.model.street),
      houseControl: new FormControl(this.model.house),
      zipControl: new FormControl(this.model.zipCode),
      cityControl: new FormControl(this.model.city)
    });
  }

  public saveClick() {
    this.isPressed = true;
    this.modelService.saveProfileAddress(this.model).subscribe(
      (model) => {
        this.isPressed = false;
        this.sessionService.activeProfile = model
        this.router.navigate(['profile']);
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
}
