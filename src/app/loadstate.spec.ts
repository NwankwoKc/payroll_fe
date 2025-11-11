import { TestBed } from '@angular/core/testing';

import { Loadstate } from './loadstate';

describe('Loadstate', () => {
  let service: Loadstate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Loadstate);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
