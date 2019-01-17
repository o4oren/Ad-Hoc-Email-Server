import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunAhemOnDockerComponent } from './run-ahem-on-docker.component';

describe('RunAhemOnDockerComponent', () => {
  let component: RunAhemOnDockerComponent;
  let fixture: ComponentFixture<RunAhemOnDockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunAhemOnDockerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunAhemOnDockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
