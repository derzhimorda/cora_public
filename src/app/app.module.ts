import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast'
import {ProgressSpinnerModule} from 'primeng/progressspinner'

import { LayoutComponent } from './component/layout/layout.component';
import { LoginComponent } from './component/login/login.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { CheckInComponent } from './component/check-in/check-in.component';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { VerificationComponent } from './component/verification/verification.component';
import { AuthService } from './service/auth.service';
import { ConfigService } from './service/config.service';
import { MessageService } from 'primeng/api';
import { AgreementComponent } from './component/agreement/agreement.component';
import { SessionService } from './service/session.service';
import { AuthInterceptor } from './service/interceptor/auth.interceptor';
import { ProfileComponent } from './component/profile/profile.component';
import { ProfilePersonEditComponent } from './component/profile-person-edit/profile-person-edit.component';
import { ProfileAddressEditComponent } from './component/profile-address-edit/profile-address-edit.component';
import { ProfileContactEditComponent } from './component/profile-contact-edit/profile-contact-edit.component';
import { ErrorService } from './service/error.service';
import { ProfilePersonNewComponent } from './component/profile-person-new/profile-person-new.component';
import { ProfileAddressNewComponent } from './component/profile-address-new/profile-address-new.component';
import { ProfileContactNewComponent } from './component/profile-contact-new/profile-contact-new.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { GuestService } from './service/guest.service';
import { UserService } from './service/user.service';
import { VaccineListComponent } from './component/vaccine-list/vaccine-list.component';
import { ShareDataComponent } from './component/share-data/share-data.component';
import { ProfileNewComponent } from './component/profile-new/profile-new.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    RadioButtonModule,
    CheckboxModule,
    PasswordModule,
    CalendarModule,
    ToastModule,
    ProgressSpinnerModule,
    AppRoutingModule
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    ForgotPasswordComponent,
    CheckInComponent,
    CheckOutComponent,
    VerificationComponent,
    AgreementComponent,
    ProfileComponent,
    ProfileAddressEditComponent,
    ProfilePersonEditComponent,
    ProfileContactEditComponent,
    ProfilePersonNewComponent,
    ProfileAddressNewComponent,
    ProfileContactNewComponent,
    ChangePasswordComponent,
    VaccineListComponent,
    ShareDataComponent,
    ProfileNewComponent
  ],
  providers: [
    ConfigService, 
    AuthService, 
    SessionService, 
    UserService, 
    MessageService,
    ErrorService,
    GuestService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
