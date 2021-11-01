import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AgreementComponent } from './component/agreement/agreement.component';
import { CheckInComponent } from './component/check-in/check-in.component';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { VerificationComponent } from './component/verification/verification.component';
import { AuthGuard } from './service/guard/auth.guard';
import { CheckOutGuard } from './service/guard/checkout.guard';
import { ProfilePersonEditComponent } from './component/profile-person-edit/profile-person-edit.component';
import { ProfileAddressEditComponent } from './component/profile-address-edit/profile-address-edit.component';
import { ProfileContactEditComponent } from './component/profile-contact-edit/profile-contact-edit.component';
import { ProfilePersonNewComponent } from './component/profile-person-new/profile-person-new.component';
import { ProfileAddressNewComponent } from './component/profile-address-new/profile-address-new.component';
import { ProfileContactNewComponent } from './component/profile-contact-new/profile-contact-new.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { VaccineListComponent } from './component/vaccine-list/vaccine-list.component';
import { ShareDataComponent } from './component/share-data/share-data.component';
import { ProfileNewComponent } from './component/profile-new/profile-new.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'agreement', component: AgreementComponent},
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  { path: 'check-in', component: CheckInComponent, canActivate: [AuthGuard]},
  { path: 'check-out', component: CheckOutComponent},
  { path: 'verification', component: VerificationComponent },
  { path: 'profile/new', component: ProfileNewComponent},
  { path: 'profile/person/new', component: ProfilePersonNewComponent },
  { path: 'profile/address/new', component: ProfileAddressNewComponent },
  { path: 'profile/contact/new', component: ProfileContactNewComponent },
  { path: 'profile/person/edit', component: ProfilePersonEditComponent},
  { path: 'profile/address/edit', component: ProfileAddressEditComponent},
  { path: 'profile/contact/edit', component: ProfileContactEditComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'vaccine', component: VaccineListComponent, canActivate: [AuthGuard]},
  { path: 'agreement', component: AgreementComponent},
  { path: 'sharedata', component: ShareDataComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
