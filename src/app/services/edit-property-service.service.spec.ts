import { TestBed } from '@angular/core/testing';

import { EditPropertyServiceService } from './edit-property-service.service';

describe('EditPropertyServiceService', () => {
  let service: EditPropertyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditPropertyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
