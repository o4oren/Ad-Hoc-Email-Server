import {Inject, Injectable, Optional} from '@angular/core';
import {AhemProperties} from '../../model/properties-model';
import {HttpClient} from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';

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
    const jsonFile = `/assets/properties.json`;
    const path = this.baseUri + jsonFile;
    console.log('path', path);
    return new Promise<void>((resolve, reject) => {
      this.http.get(path).toPromise().then(
        res => { // Success
          ConfigService.properties = <AhemProperties>res;
          resolve();
        }).catch((res: any) => {
        reject(`Could not load file '${path}': ${(res)}`);
      });
    });

  }
}
