import { TestBed } from '@angular/core/testing';

import { MemberDashboardService } from './member-dashboard-service';

describe('MemberDashboardService', () => {
  let service: MemberDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
