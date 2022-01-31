import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseMaterialComponent } from './edit-course-material.component';

describe('EditCourseMaterialComponent', () => {
  let component: EditCourseMaterialComponent;
  let fixture: ComponentFixture<EditCourseMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCourseMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
