import { TestBed } from '@angular/core/testing';

import { HitService } from './hit.service';

describe('HitService', () => {
  let service: HitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
