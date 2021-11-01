import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';
import { AppConfig } from '../model/app-config';
import { AuthTokenType } from '../model/enum/token-type.enum';
import { ForgotPasswordRequest } from '../model/security/forgot-password-request';
import { GeneratePinRequest } from '../model/security/generate-pin-request';
import { LoginRequestModel } from '../model/security/login-request';
import { LoginResponseModel } from '../model/security/login-response';
import { ConfigService } from './config.service';
import { LoginPinRequest } from '../model/security/login-pin-request';
import { GeneratePinResponse } from '../model/security/generate-pin-response';
import { BaseService } from './base.service';
import { ChangePasswordRequest } from '../model/security/change-password-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {

  public restoreToken(): Observable<LoginResponseModel> {
    return this.callPost<unknown,LoginResponseModel>({}, 'refresh')
               .pipe(tap(response => {
                      this.setAccessToken(response.token);
                      this.setRefreshToken(response.token);
                    }));
  }

  public login(request: LoginRequestModel): Observable<LoginResponseModel> {
    return this.callPost<LoginRequestModel, LoginResponseModel>(request, 'login')
               .pipe(tap(response => this.invokeLogin(request.isRemember, response)));
  }

  public logoff() {
    return this.callPost({}, 'logoff')
                .pipe(tap(() => {
                  this.removeToken(AuthTokenType.access);
                  this.removeToken(AuthTokenType.refresh);
                }));
  }

  public generatePin(request: GeneratePinRequest) {
    return this.callPost<GeneratePinRequest, unknown>(request, 'pin/gen');
  }

  public forgotPassword(request: ForgotPasswordRequest) {
    return this.callPost<ForgotPasswordRequest, unknown>(request, 'forgot/password');
  }

  public changePassword(request: ChangePasswordRequest) {
    return this.callPut<ChangePasswordRequest, unknown>(request, 'change/password');
  }

  public get accessToken(): string | null{
    return this.getToken(AuthTokenType.access);
  }

  public set accessToken(token: string | null) {
    this.setAccessToken(token);
  }

  public get refreshToken(): string | null {
    return this.getToken(AuthTokenType.refresh);
  }

  public get passwordToken(): string | null {
    return localStorage.getItem('PCT');
  }

  public set passwordToken(token: string | null) {
    if (token)
    {
      localStorage.setItem('PCT', token);  
    }
    else{
      localStorage.removeItem('PCT');
    }
  }

  protected get controller(): string {
    return 'api/auth';
  }

  private invokeLogin(isRemember: boolean, response: LoginResponseModel) {
    this.setAccessToken(response.token);
    if (isRemember) {
      this.setRefreshToken(response.token);
    }
  }

  private invokeRefresh(config: AppConfig | null): Observable<LoginResponseModel> {
    const path = `${config?.apiUrl}/api/auth/refresh`;

    return this.client.post<LoginResponseModel>(path, {token: this.refreshToken})
      .pipe(tap(model => {
        this.setAccessToken(model.token);
        this.setRefreshToken(model.token);
      }));
  }

  private setAccessToken(token: string|null) {
    this.setToken(token, AuthTokenType.access);
  }

  private setRefreshToken(token: string) {
    this.setToken(token, AuthTokenType.refresh);
  }

  private setToken(token: string|null, type: AuthTokenType) {
    const storage = type === AuthTokenType.access ? sessionStorage : localStorage;
    if (token){
      storage.setItem('token', token);
    }
    else{
      storage.removeItem('token');
    }
  }

  private getToken(type: AuthTokenType): string | null {
    const storage = type === AuthTokenType.access ? sessionStorage : localStorage;

    return storage.getItem('token');
  }

  private removeToken(type: AuthTokenType) {
    const storage = type === AuthTokenType.access ? sessionStorage : localStorage;

    return storage.removeItem('token');

  }
}
