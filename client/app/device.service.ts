import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Injectable()
export class DeviceService {
  private mediaMatcher: MediaQueryList;
  constructor( @Inject(PLATFORM_ID) private platformId: Object) {
    this.mediaMatcher = isPlatformBrowser(platformId) ? matchMedia(`(max-width: 720px)`) : null;
  }

  _isSmallScreen: boolean = null;

  isSmallScreen() {
    if(this._isSmallScreen !== null) {
      return this._isSmallScreen;
    }
    this._isSmallScreen = false;
    if (isPlatformBrowser(this.platformId) && this.mediaMatcher.matches) {
      this._isSmallScreen  = true;
    }

    return this._isSmallScreen ;
  }

  isIos() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

}
