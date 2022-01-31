import { TestBed } from '@angular/core/testing';

import { AuthAGuard } from './authA.guard';

describe('AuthAGuard', () => {
  let guard: AuthAGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthAGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
