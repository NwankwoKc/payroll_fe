import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bulkpayment } from './bulkpayment';

describe('Bulkpayment', () => {
  let component: Bulkpayment;
  let fixture: ComponentFixture<Bulkpayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bulkpayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bulkpayment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
