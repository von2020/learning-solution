import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationFacilitatorComponent } from './confirmation-facilitator.component';

describe('ConfirmationFacilitatorComponent', () => {
  let component: ConfirmationFacilitatorComponent;
  let fixture: ComponentFixture<ConfirmationFacilitatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationFacilitatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationFacilitatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
