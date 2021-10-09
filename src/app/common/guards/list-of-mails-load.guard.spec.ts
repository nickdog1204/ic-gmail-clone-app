import { TestBed } from '@angular/core/testing';

import { ListOfMailsLoadGuard } from './list-of-mails-load.guard';

describe('ListOfMailsLoadGuard', () => {
  let guard: ListOfMailsLoadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ListOfMailsLoadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
