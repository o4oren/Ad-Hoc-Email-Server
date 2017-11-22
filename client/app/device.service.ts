import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Injectable()
export class DeviceService {
  private mediaMatcher: MediaQueryList;
  constructor( @Inject(PLATFORM_ID) private platformId: Object) {
    this.mediaMatcher = isPlatformBrowser(platformId) ? matchMedia(`(max-width: 720px)`) : null;
  }

  isMobile() {
    let isMobile = false;
    if (isPlatformBrowser(this.platformId) && this.mediaMatcher.matches) {
      isMobile = true;
    }

    return isMobile;
  }

  isIos() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

}
