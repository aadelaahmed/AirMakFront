import { TestBed } from '@angular/core/testing';

import { AddPropertyService } from './add-property.service';

describe('AddPropertyService', () => {
  let service: AddPropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
