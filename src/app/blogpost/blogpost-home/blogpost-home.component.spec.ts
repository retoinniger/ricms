import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogpostHomeComponent } from './blogpost-home.component';

describe('BlogpostFeaturedComponent', () => {
  let component: BlogpostHomeComponent;
  let fixture: ComponentFixture<BlogpostHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogpostHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogpostHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
