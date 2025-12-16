import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyHead } from './family-head';

describe('FamilyHead', () => {
  let component: FamilyHead;
  let fixture: ComponentFixture<FamilyHead>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyHead]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyHead);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
