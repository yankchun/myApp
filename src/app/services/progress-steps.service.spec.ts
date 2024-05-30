import { TestBed } from '@angular/core/testing';

import { ProgressStepsService } from './progress-steps.service';

describe('ProgressStepsService', () => {
  let service: ProgressStepsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressStepsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
