import { FormControl } from "@angular/forms";
import { AjaxService } from "../services/ajax.service";
import { firstValueFrom, map, switchMap, tap, timer } from "rxjs";

const mobileNumber = /^01[0-9]{8,10}$/;
const nospace = /^[^\s].*/;

const mobileNumberValidator = (control: FormControl) => {
  if (!control.value || control.value.match(mobileNumber)) {
    return null;
  } else {
    return { invalid: true, mobNumber: true };
  }
};

const startsWithSpaceValidator = (control: FormControl) => {
    if (!control.value || control.value.match(nospace)) {
      return null;
    } else {
      return { invalid: true, startsWithSpace: true };
    }
};

const mobileNumberAsyncValidator = (ajaxService: AjaxService) => {
  return (control: FormControl) => {
    return timer(1000).pipe(
      switchMap(() => ajaxService.checkPhoneNumber(control.value).pipe(
        map(valid => valid ? null : { invalid: true, asyncInvalid: true }),
        // tap(result => console.log('Validation result for phone number:', result))
      ))
    )
    // return timer(1000).pipe(
    //   switchMap(async () => { 
    //     let valid = await firstValueFrom(ajaxService.checkPhoneNumber(control.value));
    //     return valid ? null : { invalid: true, asyncInvalid: true };
    //   })
    // )
  };
};

const emailAsyncValidator = (ajaxService: AjaxService) => {
  return (control: FormControl) => {
    return timer(1000).pipe(
      switchMap(() => ajaxService.checkEmail(control.value).pipe(
        map(valid => valid ? null : { invalid: true, asyncInvalid: true }),
        // tap(result => console.log('Validation result for email:', result))
      ))
    )
  };
};

export {
  mobileNumberValidator,
  startsWithSpaceValidator,
  mobileNumberAsyncValidator,
  emailAsyncValidator
};
