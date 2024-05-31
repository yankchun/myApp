import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AjaxService } from './ajax.service';
import { of, throwError } from 'rxjs';

describe('AjaxService', () => {
  let service: AjaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AjaxService]
    });
    service = TestBed.inject(AjaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('performAsyncCheck should eventually return undefined', fakeAsync(() => {
    service.performAsyncCheck().subscribe(result => {
      expect(result).toBeUndefined();
    });
    tick(1000);
  }));

  it('checkPhoneNumber should return false for a number in the validNumbers list', fakeAsync(() => {
    service.checkPhoneNumber('01234567890').subscribe(result => {
      expect(result).toBeFalse();
    });
    tick(1000);
  }));

  it('checkPhoneNumber should return true for a number not in the validNumbers list', fakeAsync(() => {
    service.checkPhoneNumber('00000000000').subscribe(result => {
      expect(result).toBeTrue();
    });
    tick(1000);
  }));

  it('checkEmail should return false for an email in the validEmails list', fakeAsync(() => {
    service.checkEmail('example@example.com').subscribe(result => {
      expect(result).toBeFalse();
    });
    tick(1000);
  }));

  it('checkEmail should return true for an email not in the validEmails list', fakeAsync(() => {
    service.checkEmail('notvalid@example.com').subscribe(result => {
      expect(result).toBeTrue();
    });
    tick(1000);
  }));
});
