import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paysalary } from './paysalary';

describe('Paysalary', () => {
  let component: Paysalary;
  let fixture: ComponentFixture<Paysalary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paysalary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paysalary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
