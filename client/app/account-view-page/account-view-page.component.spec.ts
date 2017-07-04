import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountViewPageComponent } from './account-view-page.component';

describe('AccountViewPageComponent', () => {
  let component: AccountViewPageComponent;
  let fixture: ComponentFixture<AccountViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
