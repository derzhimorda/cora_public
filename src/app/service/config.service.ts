import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../model/app-config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly configUrl = 'assets/config.json'
  constructor(private client: HttpClient) { }

  public get config(): Observable<AppConfig | null> {
    const storageConfigStr = sessionStorage.getItem('app-config-cache') ;
    const task = storageConfigStr === null || storageConfigStr === undefined
                 ? this.client.get<AppConfig>(this.configUrl)
                              .pipe(map(data => {
                                sessionStorage.setItem('app-config-cache', JSON.stringify(data));
                                return data;
                              }))
                 : of(JSON.parse(storageConfigStr));

    return task;
  }
}
