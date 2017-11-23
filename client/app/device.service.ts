import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Injectable()
export class DeviceService {
  private mediaMatcher: MediaQueryList;
  constructor( @Inject(PLATFORM_ID) private platformId: Object) {
    this.mediaMatcher = isPlatformBrowser(platformId) ? matchMedia(`(max-width: 720px)`) : null;
  }

  _isMobile: boolean = null;

  isMobile() {
    if(this._isMobile !== null) {
      return this._isMobile;
    }
    this._isMobile = false;
    if (isPlatformBrowser(this.platformId) && this.mediaMatcher.matches) {
      this._isMobile  = true;
    }

    return this._isMobile ;
  }

  isIos() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

}
