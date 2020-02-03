import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, Input} from '@angular/core';

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.css']
})
export class AdBannerComponent implements OnInit, AfterViewInit {

  public AHEM_TOWER = 'ahemTower';
  public AHEM_SHORT_TOWER = 'ahemShortTower';
  public AHEM_BANNER = 'ahemBanner';
  public AHEM_MOBILE_BANNER = 'ahemMobileBanner';

  @Input() public adType: string;

  @ViewChild('ahemBanner', {static: false, read: ElementRef}) ahemBannerElement: ElementRef;
  @ViewChild('ahemMobileBanner', {static: false, read: ElementRef}) ahemMobileElement: ElementRef;
  @ViewChild('ahemTower', {static: false, read: ElementRef}) towerElement: ElementRef;
  @ViewChild('ahemShortTower', {static: false, read: ElementRef}) shortTowerElement: ElementRef;


  constructor(private _renderer2: Renderer2) { }

  ngOnInit() {}


  ngAfterViewInit(): void {
    switch (this.adType) {
      case this.AHEM_TOWER: {
        this.renderTallTower();
        break;
      }
      case this.AHEM_SHORT_TOWER: {
        this.renderShortTower();
        break;
      }
      case this.AHEM_MOBILE_BANNER: {
        this.renderMobileBanner();
        break;
      }
      case this.AHEM_BANNER: {
        this.renderBanner();
        break;
      }
    }

  }

  renderBanner(): void {
    const script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.text = `
        atOptions = {
                        'key' : '938d5c0fb87beb89eafe244059ced18c',
                        'format' : 'iframe',
                        'height' : 90,
                        'width' : 728,
                        'params' : {}
                    };

            let scriptA = document.createElement('script');
            scriptA.type = 'text/javascript';
            scriptA.src = "https://www.madcpms.com/938d5c0fb87beb89eafe244059ced18c/invoke.js";
            // s.code = 'console.log("aaaaa")'
            try {
              let elA = document.getElementById("ahemBanner");
              elA.appendChild(scriptA);
            } catch (e) {
              console.log(e);
            }
        `;
    this._renderer2.appendChild(this.ahemBannerElement.nativeElement, script);
  }

  renderMobileBanner(): void {
    const script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.text = `
        atOptions = {
                        'key' : '7b948ca94242c23b2a457ae04d235025',
                        'format' : 'iframe',
                        'height' : 50,
                        'width' : 320,
                        'params' : {}
                    };

            let scriptB = document.createElement('script');
            scriptB.type = 'text/javascript';
            scriptB.src = "https://www.madcpms.com/7b948ca94242c23b2a457ae04d235025/invoke.js";
            try {
              let elB = document.getElementById("ahemMobileBanner");
              elB.appendChild(scriptB);
            } catch (e) {
              console.log(e);
            }
        `;
    this._renderer2.appendChild(this.ahemMobileElement.nativeElement, script);
  }

  renderShortTower(): void {
    const script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.text = `
        atOptions = {
                        'key' : '400fda9f32d444e1dcc4037640007321',
                        'format' : 'iframe',
                        'height' : 300,
                        'width' : 160,
                        'params' : {}
                    };

            let scriptC = document.createElement('script');
            scriptC.type = 'text/javascript';
            scriptC.src = "https://www.madcpms.com/400fda9f32d444e1dcc4037640007321/invoke.js";
            try {
              let elC = document.getElementById("ahemShortTower");
              elC.appendChild(scriptC);
            } catch (e) {
              console.log(e);
            }
        `;
    this._renderer2.appendChild(this.shortTowerElement.nativeElement, script);
  }

  renderTallTower(): void {
    const script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.text = `
        atOptions = {
                        'key' : 'fbecc40ac25f1a3dfb84295a57f64211',
                        'format' : 'iframe',
                        'height' : 600,
                        'width' : 160,
                        'params' : {}
                    };

            let scriptD = document.createElement('script');
            scriptD.type = 'text/javascript';
            scriptD.src = "https://www.madcpms.com/fbecc40ac25f1a3dfb84295a57f64211/invoke.js";
            try {
              let elD = document.getElementById("ahemTower");
              elD.appendChild(scriptD);
            } catch (e) {
              console.log(e);
            }
        `;
    this._renderer2.appendChild(this.towerElement.nativeElement, script);
  }
}
