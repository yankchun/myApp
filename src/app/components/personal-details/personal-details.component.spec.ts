import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PersonalDetailsComponent } from './personal-details.component';
import { FormWizardService } from 'src/app/services/form-wizard.service';
import { AjaxService } from 'src/app/services/ajax.service';
import { of } from 'rxjs';
import { ProgressStepsComponent } from '../@shared/progress-steps/progress-steps.component';
import { NgxLoadingModule } from 'ngx-loading';
import { Router } from '@angular/router';

describe('PersonalDetailsComponent', () => {
  let component: PersonalDetailsComponent;
  let fixture: ComponentFixture<PersonalDetailsComponent>;
  let formWizardService: jasmine.SpyObj<FormWizardService>;
  let ajaxService: jasmine.SpyObj<AjaxService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const mockPersonalDetailsFormGroup = new FormGroup({
      introduction: new FormControl('', Validators.required),
      hobbies: new FormArray([])
    });
    formWizardService = jasmine.createSpyObj('FormWizardService', ['validateGeneralDetails']);
    ajaxService = jasmine.createSpyObj('AjaxService', ['performAsyncCheck']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    Object.defineProperty(formWizardService, 'personalDetails', {
      get: jasmine.createSpy('getPersonalDetails').and.returnValue(mockPersonalDetailsFormGroup)
    });

    await TestBed.configureTestingModule({
      declarations: [PersonalDetailsComponent, ProgressStepsComponent],
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

    fixture = TestBed.createComponent(PersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "/general-details" if general details are not validated', () => {
    formWizardService.validateGeneralDetails.and.returnValue(false);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/general-details']);
  });

  it('should initialize the form correctly', () => {
    expect(component.personalDetailsForm).toBeDefined();
    expect(component.personalDetailsForm.get('introduction')).toBeDefined();
    expect(component.personalDetailsForm.get('hobbies')).toBeDefined();
  });

  it('should add a new hobby when called', () => {
    component.addHobby('Reading');
    expect(component.hobbies.value).toContain('Reading');
  });

  it('should remove a hobby by index', () => {
    component.addHobby('Reading');
    component.addHobby('Swimming');
    component.removeHobby(0);
    expect(component.hobbies.value).not.toContain('Reading');
  });

  it('should navigate to "/review-submit" on next step if form is valid', () => {
    Object.defineProperty(component.personalDetailsForm, 'valid', { get: () => true });
    ajaxService.performAsyncCheck.and.returnValue(of(void 0));
    component.nextStep();
    expect(router.navigate).toHaveBeenCalledWith(['/review-submit']);
  });

  it('should set form to touched on next step if form is invalid', () => {
    Object.defineProperty(component.personalDetailsForm, 'valid', { get: () => false });
    component.nextStep();
    expect(component.personalDetailsForm.touched).toBeTrue();
  });

  it('should call async validation and navigate to "/general-details" on valid form', () => {
    Object.defineProperty(component.personalDetailsForm, 'valid', { get: () => true });
    ajaxService.performAsyncCheck.and.returnValue(of(void 0));
    component.previousStep();
    expect(ajaxService.performAsyncCheck).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/general-details']);
  });

});
