import { TestBed } from '@angular/core/testing';

import { HealthserviceService } from './healthservice.service';

describe('HealthserviceService', () => {
  let service: HealthserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
