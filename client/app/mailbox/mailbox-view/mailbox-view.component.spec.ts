import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxViewComponent } from './mailbox-view.component';

describe('MailboxViewComponent', () => {
  let component: MailboxViewComponent;
  let fixture: ComponentFixture<MailboxViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailboxViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailboxViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
