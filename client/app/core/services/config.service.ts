import {Inject, Injectable, Optional} from '@angular/core';
import {AhemProperties} from '../../model/properties-model';
import {HttpClient} from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';
import {promise} from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static properties: AhemProperties;
  baseUri: string;
  constructor(private http: HttpClient,
              @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.baseUri = origin || '';
  }

  load() {
    return new Promise<void>((resolve, reject) => {
      this.http.get(this.baseUri + '/api/properties')
        .toPromise().then(
        res => { // Success
          ConfigService.properties = <AhemProperties>res;
          resolve();
        }).catch((res: any) => {
        reject(res);
      });
    });
  }

}
