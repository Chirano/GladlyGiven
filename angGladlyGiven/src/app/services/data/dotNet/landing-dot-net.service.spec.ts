import { TestBed } from '@angular/core/testing';

import { LandingDotNetService } from './landing-dot-net.service';

describe('LandingDotNetService', () => {
  let service: LandingDotNetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandingDotNetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
