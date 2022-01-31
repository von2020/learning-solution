import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveLearnerComponent } from './approve-learner.component';

describe('ApproveLearnerComponent', () => {
  let component: ApproveLearnerComponent;
  let fixture: ComponentFixture<ApproveLearnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveLearnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
