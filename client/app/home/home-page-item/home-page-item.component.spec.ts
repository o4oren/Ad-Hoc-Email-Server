import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageItemComponent } from './home-page-item.component';

describe('HomePageItemComponent', () => {
  let component: HomePageItemComponent;
  let fixture: ComponentFixture<HomePageItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
