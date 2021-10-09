import { TestBed } from '@angular/core/testing';

import { NgrxMapFeatureStateService } from './ngrx-map-feature-state.service';

describe('NgrxMapFeatureStateService', () => {
  let service: NgrxMapFeatureStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgrxMapFeatureStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
