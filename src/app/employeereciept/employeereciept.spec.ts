import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Employeereciept } from './employeereciept';

describe('Employeereciept', () => {
  let component: Employeereciept;
  let fixture: ComponentFixture<Employeereciept>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Employeereciept]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Employeereciept);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
