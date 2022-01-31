import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseFacilitatorComponent } from './create-course-facilitator.component';

describe('CreateCourseFacilitatorComponent', () => {
  let component: CreateCourseFacilitatorComponent;
  let fixture: ComponentFixture<CreateCourseFacilitatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCourseFacilitatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCourseFacilitatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
