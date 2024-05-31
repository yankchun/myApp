import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { WizardRedirectComponent } from './wizard-redirect.component';
import { FormWizardService } from 'src/app/services/form-wizard.service';

describe('WizardRedirectComponent', () => {
  let component: WizardRedirectComponent;
  let fixture: ComponentFixture<WizardRedirectComponent>;
  let formWizardService: jasmine.SpyObj<FormWizardService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    formWizardService = jasmine.createSpyObj('FormWizardService', ['isFormSubmitted', 'validateGeneralDetails', 'validatePersonalDetails']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [WizardRedirectComponent],
      providers: [
        { provide: FormWizardService, useValue: formWizardService },
        { provide: Router, useValue: router }
      ]
    });
    fixture = TestBed.createComponent(WizardRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to /complete if form is submitted', () => {
    formWizardService.isFormSubmitted.and.returnValue(true);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/complete']);
  });

  it('should redirect to /general-details if general details are not valid', () => {
    formWizardService.isFormSubmitted.and.returnValue(false);
    formWizardService.validateGeneralDetails.and.returnValue(false);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/general-details']);
  });

  it('should redirect to /personal-details if personal details are not valid', () => {
    formWizardService.isFormSubmitted.and.returnValue(false);
    formWizardService.validateGeneralDetails.and.returnValue(true);
    formWizardService.validatePersonalDetails.and.returnValue(false);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/personal-details']);
  });

  it('should redirect to /review-submit if all details are valid', () => {
    formWizardService.isFormSubmitted.and.returnValue(false);
    formWizardService.validateGeneralDetails.and.returnValue(true);
    formWizardService.validatePersonalDetails.and.returnValue(true);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/review-submit']);
  });

  it('should navigate to /general-details by default', () => {
    formWizardService.isFormSubmitted.and.returnValue(false);
    formWizardService.validateGeneralDetails.and.returnValue(false);
    component.ngOnInit();
    expect(router.navigate.calls.mostRecent().args[0]).toEqual(['/general-details']);
  });
});
