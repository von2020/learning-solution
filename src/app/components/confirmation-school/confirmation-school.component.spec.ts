import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationSchoolComponent } from './confirmation-school.component';

describe('ConfirmationSchoolComponent', () => {
  let component: ConfirmationSchoolComponent;
  let fixture: ComponentFixture<ConfirmationSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
