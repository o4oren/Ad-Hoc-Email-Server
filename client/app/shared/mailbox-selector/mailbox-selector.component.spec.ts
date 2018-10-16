import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxSelectorComponent } from './mailbox-selector.component';

describe('MailboxSelectorComponent', () => {
  let component: MailboxSelectorComponent;
  let fixture: ComponentFixture<MailboxSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailboxSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailboxSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
