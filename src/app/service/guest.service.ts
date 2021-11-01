import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckinModel } from '../model/checkin';
import { QrCodeModel } from '../model/qrCode';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class GuestService extends BaseService {

  public getLocation(): Observable<CheckinModel> {
    return this.callGet<CheckinModel>('location');
  }

  public checkIn(model: QrCodeModel) {
    return this.callPost(model, 'checkin');
  }

  public checkOut() {
    return this.callPost({}, 'checkout');
  }

  public get localQrCode(): string| null{
    return localStorage.getItem('LUID');
  }

  public set localQrCode(luid: string| null) {
    if (luid) {
      localStorage.setItem('LUID', luid);
    }
    else {
      localStorage.removeItem('LUID');
    }
  }

  protected get controller(): string {
    return 'api/guest';
  }
}
