import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusPage } from './status-page';

describe('StatusPage', () => {
  let component: StatusPage;
  let fixture: ComponentFixture<StatusPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
