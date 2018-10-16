import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxEmailsListComponent } from './mailbox-emails-list.component';

describe('MailboxEmailsListComponent', () => {
  let component: MailboxEmailsListComponent;
  let fixture: ComponentFixture<MailboxEmailsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailboxEmailsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailboxEmailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
