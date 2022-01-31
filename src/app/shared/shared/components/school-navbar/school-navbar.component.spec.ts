import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolNavbarComponent } from './school-navbar.component';

describe('SchoolNavbarComponent', () => {
  let component: SchoolNavbarComponent;
  let fixture: ComponentFixture<SchoolNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
