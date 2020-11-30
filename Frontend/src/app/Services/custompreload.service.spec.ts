import { TestBed } from '@angular/core/testing';

import { CustompreloadService } from './custompreload.service';

describe('CustompreloadService', () => {
  let service: CustompreloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustompreloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
