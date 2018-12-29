import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToSetUpYourOwnDisposableMailServerComponent } from './how-to-set-up-your-own-disposable-mail-server.component';

describe('HowToSetUpYourOwnDisposableMailServerComponent', () => {
  let component: HowToSetUpYourOwnDisposableMailServerComponent;
  let fixture: ComponentFixture<HowToSetUpYourOwnDisposableMailServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToSetUpYourOwnDisposableMailServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToSetUpYourOwnDisposableMailServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
