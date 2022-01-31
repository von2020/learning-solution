import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFacilitatorsComponent } from './all-facilitators.component';

describe('AllFacilitatorsComponent', () => {
  let component: AllFacilitatorsComponent;
  let fixture: ComponentFixture<AllFacilitatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFacilitatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFacilitatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
