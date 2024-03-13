import { TestBed } from '@angular/core/testing';

import { ListServicesByServiceProviderIdService } from './list-services-by-service-provider-id.service';

describe('ListServicesByServiceProviderIdService', () => {
  let service: ListServicesByServiceProviderIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListServicesByServiceProviderIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
