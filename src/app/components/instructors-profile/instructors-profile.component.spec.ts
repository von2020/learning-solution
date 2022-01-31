import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsProfileComponent } from './instructors-profile.component';

describe('InstructorsProfileComponent', () => {
  let component: InstructorsProfileComponent;
  let fixture: ComponentFixture<InstructorsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorsProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
