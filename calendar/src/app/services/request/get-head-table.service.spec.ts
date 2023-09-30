import { TestBed } from '@angular/core/testing';

import { GetHeadTableService } from './get-head-table.service';

describe('GetHeadTableService', () => {
  let service: GetHeadTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetHeadTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
