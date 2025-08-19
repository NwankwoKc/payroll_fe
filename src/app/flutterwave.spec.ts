import { TestBed } from '@angular/core/testing';

import { Flutterwave } from './flutterwave';

describe('Flutterwave', () => {
  let service: Flutterwave;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Flutterwave);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
