import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalFacilitatorsComponent } from './internal-facilitators.component';

describe('InternalFacilitatorsComponent', () => {
  let component: InternalFacilitatorsComponent;
  let fixture: ComponentFixture<InternalFacilitatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalFacilitatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalFacilitatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
