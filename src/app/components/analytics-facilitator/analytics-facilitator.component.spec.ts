import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsFacilitatorComponent } from './analytics-facilitator.component';

describe('AnalyticsFacilitatorComponent', () => {
  let component: AnalyticsFacilitatorComponent;
  let fixture: ComponentFixture<AnalyticsFacilitatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsFacilitatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsFacilitatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
