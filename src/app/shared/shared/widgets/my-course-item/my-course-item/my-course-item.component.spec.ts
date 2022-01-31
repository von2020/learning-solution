import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCourseItemComponent } from './my-course-item.component';

describe('MyCourseItemComponent', () => {
  let component: MyCourseItemComponent;
  let fixture: ComponentFixture<MyCourseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCourseItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCourseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
