import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePercentagComponent } from './course-percentag.component';

describe('CoursePercentagComponent', () => {
  let component: CoursePercentagComponent;
  let fixture: ComponentFixture<CoursePercentagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursePercentagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePercentagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
