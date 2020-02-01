import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdBannerComponent } from './ad-banner.component';

describe('AdBannerComponent', () => {
  let component: AdBannerComponent;
  let fixture: ComponentFixture<AdBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
