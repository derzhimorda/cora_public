import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service'
import { AuthService } from '../../service/auth.service';
import { SessionService } from '../../service/session.service';
import { calendar_DE } from '../../const/de-calendar.constant';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(private authService: AuthService,
    private sessionService: SessionService,
    private profileService: UserService,
    private router: Router,
    private primeNGConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primeNGConfig.setTranslation(calendar_DE);
    const refreshToken = this.authService.refreshToken;
    const passportToken = this.authService.passwordToken;
    const hasRefreshToken = refreshToken && refreshToken !== '';
    const hasPassportToken = passportToken && passportToken !== '';
    if (hasRefreshToken || hasPassportToken) {
      if (hasRefreshToken) {
        this.authService.accessToken = refreshToken;
        this.loginWithRefreshToken();
      }
      else {
        this.authService.accessToken = passportToken;
        this.router.navigate(['changepassword']);
      }
    }
    else {
      this.router.navigate(['login']);
    }
  }

  private loginWithRefreshToken() {
    this.authService
      .restoreToken()
      .pipe(tap(() => {
        this.profileService.getProfile()
          .subscribe(
            (model) => {
              this.sessionService.activeProfile = model;
            })
      }),
        catchError((error) => { throw (error) }))
      .subscribe((response) => {
        this.sessionService.session.isVeryfied = response.verified;
        this.sessionService.session.isCheckedIn = response.checked;
        this.sessionService.session.lotNumber = response.lotNumber;
        const path = response.checked ? 'check-out' : 'check-in';
        this.router.navigate([path]);
      },
        () => {
          this.router.navigate(['login'])
        });
  }
}
