import { TestBed } from '@angular/core/testing';

import { HandleTransitionService } from './handle-transition.service';

describe('HandleTransitionService', () => {
  let service: HandleTransitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleTransitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
