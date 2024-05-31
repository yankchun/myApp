import { FormControl } from '@angular/forms';
import { AjaxService } from '../services/ajax.service';
import {
  mobileNumberValidator,
  startsWithSpaceValidator,
  mobileNumberAsyncValidator,
  emailAsyncValidator
} from './validator';
import { of } from 'rxjs';

describe('Validators', () => {
  let ajaxService: jasmine.SpyObj<AjaxService>;

  beforeEach(() => {
    ajaxService = jasmine.createSpyObj('AjaxService', ['checkPhoneNumber', 'checkEmail']);
  });

  describe('mobileNumberValidator', () => {
    it('should return null if control value is empty', () => {
      const control = new FormControl('');
      expect(mobileNumberValidator(control)).toBeNull();
    });

    it('should return null for a valid mobile number', () => {
      const control = new FormControl('01234567890');
      expect(mobileNumberValidator(control)).toBeNull();
    });

    it('should return error object for an invalid mobile number', () => {
      const control = new FormControl('1234');
      expect(mobileNumberValidator(control)).toEqual({ invalid: true, mobNumber: true });
    });
  });

  describe('startsWithSpaceValidator', () => {
    it('should return null if control value is empty', () => {
      const control = new FormControl('');
      expect(startsWithSpaceValidator(control)).toBeNull();
    });

    it('should return null when input does not start with space', () => {
      const control = new FormControl('text');
      expect(startsWithSpaceValidator(control)).toBeNull();
    });

    it('should return error object when input starts with a space', () => {
      const control = new FormControl(' text');
      expect(startsWithSpaceValidator(control)).toEqual({ invalid: true, startsWithSpace: true });
    });
  });

  describe('mobileNumberAsyncValidator', () => {
    it('should return null if the phone number is valid', (done: DoneFn) => {
      const control = new FormControl('01234567890');
      ajaxService.checkPhoneNumber.and.returnValue(of(true));

      const validator = mobileNumberAsyncValidator(ajaxService);
      validator(control).subscribe(result => {
        expect(result).toBeNull();
        done();
      });
    });

    it('should return error object if the phone number is invalid', (done: DoneFn) => {
      const control = new FormControl('01234567890');
      ajaxService.checkPhoneNumber.and.returnValue(of(false));

      const validator = mobileNumberAsyncValidator(ajaxService);
      validator(control).subscribe(result => {
        expect(result).toEqual({ invalid: true, asyncInvalid: true });
        done();
      });
    });
  });

  describe('emailAsyncValidator', () => {
    it('should return null if the email is valid', (done: DoneFn) => {
      const control = new FormControl('test@example.com');
      ajaxService.checkEmail.and.returnValue(of(true));

      const validator = emailAsyncValidator(ajaxService);
      validator(control).subscribe(result => {
        expect(result).toBeNull();
        done();
      });
    });

    it('should return error object if the email is invalid', (done: DoneFn) => {
      const control = new FormControl('test@example.com');
      ajaxService.checkEmail.and.returnValue(of(false));

      const validator = emailAsyncValidator(ajaxService);
      validator(control).subscribe(result => {
        expect(result).toEqual({ invalid: true, asyncInvalid: true });
        done();
      });
    });
  });
});
