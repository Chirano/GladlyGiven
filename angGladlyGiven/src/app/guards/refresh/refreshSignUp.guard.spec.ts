import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { refreshGuard } from './refreshSignUp.guard';

describe('refreshGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => refreshGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
