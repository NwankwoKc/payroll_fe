import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessMsg } from './success-msg';

describe('SuccessMsg', () => {
  let component: SuccessMsg;
  let fixture: ComponentFixture<SuccessMsg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessMsg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessMsg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
