import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordLearnerComponent } from './forgot-password-learner.component';

describe('ForgotPasswordLearnerComponent', () => {
  let component: ForgotPasswordLearnerComponent;
  let fixture: ComponentFixture<ForgotPasswordLearnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordLearnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
