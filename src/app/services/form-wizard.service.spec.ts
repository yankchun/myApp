import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { FormWizardService } from './form-wizard.service';

describe('FormWizardService', () => {
  let service: FormWizardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormWizardService, FormBuilder]
    });
    service = TestBed.inject(FormWizardService);
  });

  it('should return false if any general detail is empty', () => {
    service.form.controls['generalDetails'].setValue({
      name: '', phoneNumber: '1234567890', email: 'test@example.com', gender: 'male', dob: '1990-01-01'
    });
    expect(service.validateGeneralDetails()).toBeFalse();
  });

  it('should return true if all general details are filled', () => {
    service.form.controls['generalDetails'].setValue({
      name: 'John Doe', phoneNumber: '1234567890', email: 'test@example.com', gender: 'male', dob: '1990-01-01'
    });
    expect(service.validateGeneralDetails()).toBeTrue();
  });

  it('should return false if required personal details are empty', () => {
    service.form.controls['personalDetails'].setValue({
      introduction: '', hobbies: ['reading', 'swimming']
    });
    expect(service.validatePersonalDetails()).toBeFalse();
  });

  it('should return true if required personal details are filled', () => {
    service.form.controls['personalDetails'].setValue({
      introduction: 'Hello World', hobbies: ['reading', 'swimming']
    });
    expect(service.validatePersonalDetails()).toBeTrue();
  });
});
