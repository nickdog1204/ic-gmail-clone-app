import { TestBed } from '@angular/core/testing';

import { NgrxAppStateService } from './ngrx-app-state.service';

describe('NgrxAppStateService', () => {
  let service: NgrxAppStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgrxAppStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
