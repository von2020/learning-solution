import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLogInComponent } from './school-log-in.component';

describe('SchoolLogInComponent', () => {
  let component: SchoolLogInComponent;
  let fixture: ComponentFixture<SchoolLogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolLogInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
