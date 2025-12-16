import { TestBed } from '@angular/core/testing';

import { Userview } from './userview';

describe('Userview', () => {
  let service: Userview;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Userview);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
