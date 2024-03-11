import { TestBed } from '@angular/core/testing';

import { RefugeeService } from './refugee.service';

describe('RefugeeService', () => {
  let service: RefugeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefugeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
