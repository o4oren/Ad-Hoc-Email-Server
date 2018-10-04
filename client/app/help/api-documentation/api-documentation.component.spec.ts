import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiDocumentationComponent } from './api-documentation.component';

describe('ApiDocumentationComponent', () => {
  let component: ApiDocumentationComponent;
  let fixture: ComponentFixture<ApiDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
