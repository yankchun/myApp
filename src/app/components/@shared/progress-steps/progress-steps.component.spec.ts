import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressStepsComponent } from './progress-steps.component';
import { ProgressStepsService } from 'src/app/services/progress-steps.service';
import { ProgressSteps } from 'src/app/models/progress-steps.model';

describe('ProgressStepsComponent', () => {
  let component: ProgressStepsComponent;
  let fixture: ComponentFixture<ProgressStepsComponent>;
  let mockProgressStepsService: jasmine.SpyObj<ProgressStepsService>;
  let fakeSteps: ProgressSteps[];

  beforeEach(() => {
    fakeSteps = [
      { id: '1', title: 'Step 1', completed: true, current: false },
      { id: '2', title: 'Step 2', completed: false, current: true }
    ];

    mockProgressStepsService = jasmine.createSpyObj('ProgressStepsService', ['getSteps']);
    mockProgressStepsService.getSteps.and.returnValue(fakeSteps);

    TestBed.configureTestingModule({
      declarations: [ProgressStepsComponent],
      providers: [
        { provide: ProgressStepsService, useValue: mockProgressStepsService }
      ]
    });
    fixture = TestBed.createComponent(ProgressStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have steps loaded on initialization', () => {
    expect(component.steps.length).toBe(2);
    expect(component.steps).toEqual(fakeSteps);
  });

  it('should call getSteps on the service when initialized', () => {
    expect(mockProgressStepsService.getSteps).toHaveBeenCalled();
  });
});
