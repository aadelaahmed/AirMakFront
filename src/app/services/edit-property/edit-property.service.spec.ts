import { TestBed } from '@angular/core/testing';

import { EditPropertyService } from './edit-property.service';

describe('EditPropertyService', () => {
  let service: EditPropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditPropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
