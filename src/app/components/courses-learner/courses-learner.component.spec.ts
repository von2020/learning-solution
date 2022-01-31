import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesLearnerComponent } from './courses-learner.component';

describe('CoursesLearnerComponent', () => {
  let component: CoursesLearnerComponent;
  let fixture: ComponentFixture<CoursesLearnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesLearnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
