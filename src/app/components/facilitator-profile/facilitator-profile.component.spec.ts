import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitatorProfileComponent } from './facilitator-profile.component';

describe('FacilitatorProfileComponent', () => {
  let component: FacilitatorProfileComponent;
  let fixture: ComponentFixture<FacilitatorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilitatorProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitatorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
