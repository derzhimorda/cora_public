import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ObservableInput, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { AppConfig } from '../model/app-config';
import { ConfigService } from './config.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {

  constructor(protected configService: ConfigService, 
              protected errorService: ErrorService, 
              protected messageService: MessageService,
              private router: Router,
              protected client: HttpClient) { }

  protected mergeWithConfigRequest<Out, T extends ObservableInput<Out>>(project: (value: AppConfig | null, index: number) => T) {
    return this.configService
    .config
    .pipe(mergeMap(project));
  }

  protected callGet<Out>(path?: string) {
    return this.mergeWithConfigRequest(config => {
      return this.client
                 .get<Out>(this.getPath(path, config))
                 .pipe(catchError(error => this.processHttpErrorRespone(error)));
    })
  }

  protected callPost<In, Out>(model: In, path?: string) {
    return this.mergeWithConfigRequest(config => {
      return this.client
                 .post<Out>(this.getPath(path, config), model)
                 .pipe(catchError(error => this.processHttpErrorRespone(error)));
    })
  }

  protected callPut<In, Out>(model: In, path: string) {
    return this.mergeWithConfigRequest(config => {
      return this.client.put<Out>(this.getPath(path, config), model)
                 .pipe(catchError(error => this.processHttpErrorRespone(error)));
    })
  }

  protected callDelete(path: string) {
    return this.mergeWithConfigRequest(config => {
      return this.client.delete(this.getPath(path, config))
                 .pipe(catchError(error => this.processHttpErrorRespone(error)));
    })
  }

  protected abstract get controller(): string

  private getPath(path: string|undefined, config: AppConfig | null): string {
    if (path === undefined || path === '') {
      return `${config?.apiUrl}/${this.controller}`
    } else {
      return `${config?.apiUrl}/${this.controller}/${path}`;
    }
  }

  private processHttpErrorRespone(error: HttpErrorResponse) {
    const messageList: string[] = [];
    let hasTokenError = false;
    if (error.error instanceof ErrorEvent) {
      messageList.push(error.error.message);
    }
    else {
      const status = error.status;
      if (status === 500 || status === 405){
        messageList.push('Dienst nicht verfügbar');
      }
      if ('errors' in error.error) {
        const errorArray = error.error.errors as Array<string>;
        hasTokenError = (errorArray.filter(item=>item === this.errorService.invalidTokenKey))?.length > 0;
        const message = hasTokenError ? this.errorService.invalidTokenError : this.errorService.getServiceError(this.controller, errorArray[0]);
        messageList.push(message);
      }
      else {
        messageList.push(error.message);
      }
    }
    if (hasTokenError){
      this.router.navigate(['login']);
    }
    return throwError(messageList);
  }
}
