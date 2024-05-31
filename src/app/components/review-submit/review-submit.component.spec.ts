import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReviewSubmitComponent } from './review-submit.component';
import { FormWizardService } from 'src/app/services/form-wizard.service';
import { ProgressStepsService } from 'src/app/services/progress-steps.service';
import { of } from 'rxjs';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProgressStepsComponent } from '../@shared/progress-steps/progress-steps.component';

describe('ReviewSubmitComponent', () => {
  let component: ReviewSubmitComponent;
  let fixture: ComponentFixture<ReviewSubmitComponent>;
  let router: jasmine.SpyObj<Router>;
  let formWizardService: jasmine.SpyObj<FormWizardService>;
  let progressStepsService: jasmine.SpyObj<ProgressStepsService>;
  let dialogMock: any;

  const initialGeneralDetails = {
    name: 'John Doe',
    phoneNumber: '1234567890',
    email: 'example@example.com',
    gender: 'Male',
    dob: '01/01/1980'
  };

  const initialPersonalDetails = {
    introduction: 'An example introduction',
    hobbies: ['reading', 'gaming']
  };

  const createGeneralFormGroup = (details: any) => new FormGroup({
    name: new FormControl(details.name),
    phoneNumber: new FormControl(details.phoneNumber),
    email: new FormControl(details.email),
    gender: new FormControl(details.gender),
    dob: new FormControl(details.dob)
  });

  const createPersonalFormGroup = (details: any) => new FormGroup({
    introduction: new FormControl(details.introduction),
    hobbies: new FormControl(details.hobbies)
  });

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    dialogMock = { open: jasmine.createSpy('open').and.returnValue({ afterClosed: () => of(true) }) };
    progressStepsService = jasmine.createSpyObj('ProgressStepsService', ['setCurrentStep', 'getSteps']);
    formWizardService = jasmine.createSpyObj('FormWizardService', ['markFormAsSubmitted', 'validateGeneralDetails', 'validatePersonalDetails', 'isFormSubmitted']);

    const generalDetails = createGeneralFormGroup(initialGeneralDetails);
    const personalDetails = createPersonalFormGroup(initialPersonalDetails);

    const formMock = {
      valid: true,
      reset: jasmine.createSpy('reset'),
      value: {
        generalDetails: initialGeneralDetails,
        personalDetails: initialPersonalDetails
      },
      markAllAsTouched: jasmine.createSpy('markAllAsTouched')
    };

    Object.defineProperties(formWizardService, {
      'form': { get: () => formMock },
      'generalDetails': { get: () => generalDetails },
      'personalDetails': { get: () => personalDetails }
    });

    TestBed.configureTestingModule({
      declarations: [ReviewSubmitComponent, ProgressStepsComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: Router, useValue: router },
        { provide: MatDialog, useValue: dialogMock },
        { provide: FormWizardService, useValue: formWizardService },
        { provide: ProgressStepsService, useValue: progressStepsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to general-details if general details are not valid', () => {
    formWizardService.validateGeneralDetails.and.returnValue(false);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/general-details']);
  });

  it('should navigate to personal-details if personal details are not valid', () => {
    formWizardService.validateGeneralDetails.and.returnValue(true);
    formWizardService.validatePersonalDetails.and.returnValue(false);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/personal-details']);
  });

  it('should set the current progress step on init', () => {
    component.ngOnInit();
    expect(progressStepsService.setCurrentStep).toHaveBeenCalledWith('reviewSubmit');
  });

  it('should navigate to personal-details when previousStep is called', () => {
    component.previousStep();
    expect(router.navigate).toHaveBeenCalledWith(['/personal-details']);
  });

  it('should open a dialog on submit', () => {
    component.onSubmit();
    expect(dialogMock.open).toHaveBeenCalled();
  });

  it('should reset the form and navigate on successful form submission', () => {
    component.onSubmit();
    expect(formWizardService.markFormAsSubmitted).toHaveBeenCalled();
    expect(formWizardService.form.reset()).toHaveBeenCalled;
    expect(router.navigate).toHaveBeenCalledWith(['/complete']);
  });

});
