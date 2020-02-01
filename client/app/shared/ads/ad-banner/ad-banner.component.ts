import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.css']
})
export class AdBannerComponent implements OnInit, AfterViewInit {

  @ViewChild('adBanner', {static: false, read: ElementRef}) adBanner: ElementRef;

  constructor(private _renderer2: Renderer2) { }

  ngOnInit() {
  }


  ngAfterViewInit(): void {
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
        document.write('<scr' + 'ipt type="text/javascript" src="http' + (location.protocol === 'https:' ? 's' : '') + '://www.madcpms.com/938d5c0fb87beb89eafe244059ced18c/invoke.js"></scr' + 'ipt>');
        `;
    this._renderer2.appendChild(this.adBanner.nativeElement, script);
  }

}
