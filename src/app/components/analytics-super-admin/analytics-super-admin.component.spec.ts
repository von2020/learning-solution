import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsSuperAdminComponent } from './analytics-super-admin.component';

describe('AnalyticsSuperAdminComponent', () => {
  let component: AnalyticsSuperAdminComponent;
  let fixture: ComponentFixture<AnalyticsSuperAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsSuperAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
