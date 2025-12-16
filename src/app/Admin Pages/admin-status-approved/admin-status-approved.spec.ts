import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatusApproved } from './admin-status-approved';

describe('AdminStatusApproved', () => {
  let component: AdminStatusApproved;
  let fixture: ComponentFixture<AdminStatusApproved>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStatusApproved]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStatusApproved);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
