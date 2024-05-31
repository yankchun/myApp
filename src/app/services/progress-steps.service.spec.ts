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

  it('should initialize with three steps', () => {
    const steps = service.getSteps();
    expect(steps.length).toBe(3);
    expect(steps[0].id).toEqual('generalDetails');
    expect(steps[1].id).toEqual('personalDetails');
    expect(steps[2].id).toEqual('reviewSubmit');
  });

  it('should set first step as current and others as not completed when first step is current', () => {
    service.setCurrentStep('generalDetails');
    const steps = service.getSteps();
    expect(steps[0].current).toBeTrue();
    expect(steps[0].completed).toBeFalse();
    expect(steps[1].completed).toBeFalse();
    expect(steps[1].current).toBeFalse();
    expect(steps[2].completed).toBeFalse();
    expect(steps[2].current).toBeFalse();
  });

  it('should mark previous steps as completed when a middle step is current', () => {
    service.setCurrentStep('personalDetails');
    const steps = service.getSteps();
    expect(steps[0].completed).toBeTrue();
    expect(steps[0].current).toBeFalse();
    expect(steps[1].current).toBeTrue();
    expect(steps[1].completed).toBeFalse();
    expect(steps[2].completed).toBeFalse();
    expect(steps[2].current).toBeFalse();
  });

  it('should mark all previous steps as completed and last step as current', () => {
    service.setCurrentStep('reviewSubmit');
    const steps = service.getSteps();
    expect(steps[0].completed).toBeTrue();
    expect(steps[1].completed).toBeTrue();
    expect(steps[2].current).toBeTrue();
    expect(steps[2].completed).toBeFalse();
  });
});
