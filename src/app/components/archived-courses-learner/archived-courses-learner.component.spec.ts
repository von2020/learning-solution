import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedCoursesLearnerComponent } from './archived-courses-learner.component';

describe('ArchivedCoursesLearnerComponent', () => {
  let component: ArchivedCoursesLearnerComponent;
  let fixture: ComponentFixture<ArchivedCoursesLearnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedCoursesLearnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedCoursesLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
