import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSubCategoryComponent } from './course-sub-category.component';

describe('CourseSubCategoryComponent', () => {
  let component: CourseSubCategoryComponent;
  let fixture: ComponentFixture<CourseSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseSubCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
