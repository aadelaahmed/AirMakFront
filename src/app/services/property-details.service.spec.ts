import { TestBed } from '@angular/core/testing';

import { PropertyDetailsService } from './property-details.service';

describe('PropertyDetailsService', () => {
  let service: PropertyDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
