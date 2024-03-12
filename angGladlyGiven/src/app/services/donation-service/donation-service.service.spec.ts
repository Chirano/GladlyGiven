import { TestBed } from '@angular/core/testing';

import { DonationServiceService } from './donation-service.service';

describe('DonationServiceService', () => {
  let service: DonationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
