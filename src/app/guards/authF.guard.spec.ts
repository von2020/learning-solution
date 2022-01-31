import { TestBed } from '@angular/core/testing';

import { AuthFGuard } from './authF.guard';

describe('AuthFGuard', () => {
  let guard: AuthFGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthFGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
