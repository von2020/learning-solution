import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordFacilitatorComponent } from './forgot-password-facilitator.component';

describe('ForgotPasswordFacilitatorComponent', () => {
  let component: ForgotPasswordFacilitatorComponent;
  let fixture: ComponentFixture<ForgotPasswordFacilitatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordFacilitatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordFacilitatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
