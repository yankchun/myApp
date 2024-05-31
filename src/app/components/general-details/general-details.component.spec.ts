import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormWizardService } from 'src/app/services/form-wizard.service';
import { AjaxService } from 'src/app/services/ajax.service';
import { of } from 'rxjs';
import { ProgressStepsComponent } from '../@shared/progress-steps/progress-steps.component';
import { NgxLoadingModule } from 'ngx-loading';
import { Router } from '@angular/router';
import { GeneralDetailsComponent } from './general-details.component';

describe('GeneralDetailsComponent', () => {
  let component: GeneralDetailsComponent;
  let fixture: ComponentFixture<GeneralDetailsComponent>;
  let formWizardService: jasmine.SpyObj<FormWizardService>;
  let ajaxService: jasmine.SpyObj<AjaxService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const mockGeneralDetailsFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
    });
    formWizardService = jasmine.createSpyObj('FormWizardService', ['generalDetails']);
    ajaxService = jasmine.createSpyObj('AjaxService', ['performAsyncCheck', 'checkEmail']);
    ajaxService.checkEmail.and.returnValue(of(true));
    router = jasmine.createSpyObj('Router', ['navigate']);

    Object.defineProperty(formWizardService, 'generalDetails', {
      get: jasmine.createSpy('getGeneralDetails').and.returnValue(mockGeneralDetailsFormGroup)
    });

    await TestBed.configureTestingModule({
      declarations: [GeneralDetailsComponent, ProgressStepsComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        FontAwesomeModule,
        NgxLoadingModule.forRoot({})
      ],
      providers: [
        { provide: FormWizardService, useValue: formWizardService },
        { provide: AjaxService, useValue: ajaxService },
        { provide: Router, useValue: router },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty fields if no data in formWizardService', () => {
    expect(component.generalDetailsForm.value).toEqual({
      name: '',
      phoneNumber: '',
      email: '',
      gender: '',
      dob: ''
    });
  });

  it('should populate the form when there is data', () => {
    const mockData = {
      name: 'John Doe',
      phoneNumber: '1234567890',
      email: 'john@example.com',
      gender: 'Male',
      dob: '1990-01-01'
    };
  
    Object.defineProperty(formWizardService, 'generalDetails', { get: jasmine.createSpy('generalDetails').and.returnValue({ value: mockData }) });
  
    component.initializeForm();
    expect(component.generalDetailsForm.value).toEqual(mockData);
  });  

  it('should call performAsyncCheck and navigate to /personal-details on valid form', () => {
    Object.defineProperty(component.generalDetailsForm, 'valid', { get: () => true });

    ajaxService.performAsyncCheck.and.returnValue(of(undefined));

    component.nextStep();

    expect(router.navigate).toHaveBeenCalledWith(['/personal-details']);
    expect(component.isLoading).toBeFalse();
  });

  it('should not navigate if form is invalid', () => {
    component.generalDetailsForm.setErrors({ incorrect: true });
    component.nextStep();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
