import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailInfoComponent } from './email-info.component';

describe('EmailInfoComponent', () => {
  let component: EmailInfoComponent;
  let fixture: ComponentFixture<EmailInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
