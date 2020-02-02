import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdTowerComponent } from './ad-tower.component';

describe('AdTowerComponent', () => {
  let component: AdTowerComponent;
  let fixture: ComponentFixture<AdTowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdTowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdTowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
