import { TestBed } from '@angular/core/testing';

import { IrsapiService } from './irsapi.service';

describe('IrsapiService', () => {
  let service: IrsapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IrsapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
