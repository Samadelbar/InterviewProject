import { TestBed } from '@angular/core/testing';

import { ReverseScreenerFilterService } from './reverse-screener-filter.service';

describe('ReverseScreenerFilterService', () => {
  let service: ReverseScreenerFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReverseScreenerFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
