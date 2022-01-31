import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSuperAdminComponent } from './payment-super-admin.component';

describe('PaymentSuperAdminComponent', () => {
  let component: PaymentSuperAdminComponent;
  let fixture: ComponentFixture<PaymentSuperAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentSuperAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
