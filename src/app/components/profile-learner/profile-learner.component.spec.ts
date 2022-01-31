import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLearnerComponent } from './profile-learner.component';

describe('ProfileLearnerComponent', () => {
  let component: ProfileLearnerComponent;
  let fixture: ComponentFixture<ProfileLearnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileLearnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
