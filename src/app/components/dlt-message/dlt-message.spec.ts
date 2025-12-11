import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DltMessage } from './dlt-message';

describe('DltMessage', () => {
  let component: DltMessage;
  let fixture: ComponentFixture<DltMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DltMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DltMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
