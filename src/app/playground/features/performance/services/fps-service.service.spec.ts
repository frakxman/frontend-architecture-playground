import { TestBed } from '@angular/core/testing';

import { FpsServiceService } from './fps-service.service';

describe('FpsServiceService', () => {
  let service: FpsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FpsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
