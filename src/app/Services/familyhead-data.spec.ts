import { TestBed } from '@angular/core/testing';

import { FamilyheadData } from './familyhead-data';

describe('FamilyheadData', () => {
  let service: FamilyheadData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyheadData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
