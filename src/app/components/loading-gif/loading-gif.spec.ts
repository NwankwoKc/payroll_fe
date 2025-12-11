import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingGif } from './loading-gif';

describe('LoadingGif', () => {
  let component: LoadingGif;
  let fixture: ComponentFixture<LoadingGif>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingGif]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingGif);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
