import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostPageComponent } from './blog-post-page.component';

describe('BlogPostPageComponent', () => {
  let component: BlogPostPageComponent;
  let fixture: ComponentFixture<BlogPostPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogPostPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
