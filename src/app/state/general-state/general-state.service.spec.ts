import { TestBed } from '@angular/core/testing';

import { GeneralStateService } from './general-state.service';

describe('GeneralService', () => {
  let service: GeneralStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
