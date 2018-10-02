import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEmailsComponent } from './account-emails.component';

describe('AccountEmailsComponent', () => {
  let component: AccountEmailsComponent;
  let fixture: ComponentFixture<AccountEmailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountEmailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
