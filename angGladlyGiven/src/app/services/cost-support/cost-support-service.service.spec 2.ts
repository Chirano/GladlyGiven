import { TestBed } from '@angular/core/testing';

import { CostSupportServiceService } from './cost-support-service.service';

describe('CostSupportServiceService', () => {
  let service: CostSupportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostSupportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
