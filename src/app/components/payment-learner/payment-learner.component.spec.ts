import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentLearnerComponent } from './payment-learner.component';

describe('PaymentLearnerComponent', () => {
  let component: PaymentLearnerComponent;
  let fixture: ComponentFixture<PaymentLearnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentLearnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
