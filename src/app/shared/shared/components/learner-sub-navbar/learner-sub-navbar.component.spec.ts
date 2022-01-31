import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerSubNavbarComponent } from './learner-sub-navbar.component';

describe('LearnerSubNavbarComponent', () => {
  let component: LearnerSubNavbarComponent;
  let fixture: ComponentFixture<LearnerSubNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnerSubNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerSubNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
