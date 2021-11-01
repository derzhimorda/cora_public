import { Injectable } from '@angular/core';
import { coraErrorConfig } from '../infrastructure/error/cora-error-config';
import { AppErrorConfig } from '../model/infrastructure/app-error-config';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private appErrorConfig: AppErrorConfig = coraErrorConfig;

  constructor() { }

  public getServiceError(service: string, errorCode: string) {
    let error = this.getError(service, errorCode);
    if (!error)
    {
      error = this.getError('common', errorCode);
    }

    return (error) ? error : errorCode;
  }

  public get invalidTokenKey(): string{
    return 'tokenNotFound';
  }

  public get invalidTokenError(): string{
    return this.getError('common', 'tokenNotFound')??'';
  }

  private getError(service: string, errorCode: string): string|undefined {
    const apiErrors = this.appErrorConfig.errors.find(item => item[service])?.[service];
    if (!apiErrors){
      return undefined;
    }

    return apiErrors.find(item => item[errorCode])?.[errorCode];
  }
}
