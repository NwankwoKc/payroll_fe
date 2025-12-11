import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Verifypasswrd } from './verifypasswrd';

describe('Verifypasswrd', () => {
  let component: Verifypasswrd;
  let fixture: ComponentFixture<Verifypasswrd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Verifypasswrd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Verifypasswrd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
