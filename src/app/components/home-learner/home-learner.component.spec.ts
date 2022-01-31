import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLearnerComponent } from './home-learner.component';

describe('HomeLearnerComponent', () => {
  let component: HomeLearnerComponent;
  let fixture: ComponentFixture<HomeLearnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLearnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
