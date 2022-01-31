import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInternalFacilitatorComponent } from './home-internal-facilitator.component';

describe('HomeInternalFacilitatorComponent', () => {
  let component: HomeInternalFacilitatorComponent;
  let fixture: ComponentFixture<HomeInternalFacilitatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeInternalFacilitatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeInternalFacilitatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
