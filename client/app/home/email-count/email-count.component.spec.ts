import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCountComponent } from './email-count.component';

describe('EmailCountComponent', () => {
  let component: EmailCountComponent;
  let fixture: ComponentFixture<EmailCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
