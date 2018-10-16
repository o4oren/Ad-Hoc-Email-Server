import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailViewComponent } from './email-view.component';

describe('EmailViewComponent', () => {
  let component: EmailViewComponent;
  let fixture: ComponentFixture<EmailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
