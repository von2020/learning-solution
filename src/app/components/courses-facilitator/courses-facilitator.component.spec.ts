import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesFacilitatorComponent } from './courses-facilitator.component';

describe('CoursesFacilitatorComponent', () => {
  let component: CoursesFacilitatorComponent;
  let fixture: ComponentFixture<CoursesFacilitatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesFacilitatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesFacilitatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
