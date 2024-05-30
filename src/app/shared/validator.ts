import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from "@angular/forms";
import { AjaxService } from "../services/ajax.service";
import { Observable, debounceTime, map, switchMap, tap } from "rxjs";

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

// function emailTakenValidator(ajaxService: AjaxService) {
//   return (control: AbstractControl): Observable<ValidationErrors  | null> => {
//     return control.valueChanges.pipe(
//       debounceTime(1000),
//       switchMap(value => {
//         console.log('Checking email:', value);
//         return ajaxService.checkEmailNotTaken(value);
//       }),
//       map(isNotTaken => (isNotTaken ? null : { emailTaken: true })),
//       tap(error => console.log("Validation result for email:", error))
//     );
//   };
// }

// function phoneNumberTakenValidator(ajaxService: AjaxService) {
//   return (control: AbstractControl): Observable<ValidationErrors  | null> => {
//     return control.valueChanges.pipe(
//       debounceTime(1000),
//       switchMap(value => {
//         console.log('Checking Phone Number:', value);
//         return ajaxService.checkPhoneNumberNotTaken(value);
//       }),
//       map(isNotTaken => {
//         console.log('Phone Number taken:', isNotTaken);
//         const error = isNotTaken ? null : { phoneNumberTaken: true };
//         console.log("Phone Number error: ", error);
//         return isNotTaken ? null : {  invalid: true, phoneNumberTaken: true };
//       }),
//       tap(error => console.log("Validation result for phone number:", error))
//     );
//   };
// }

const mobileNumberAsyncValidator = (ajaxService: AjaxService) => {
  return (control: FormControl) => {
    return control.valueChanges.pipe(
      debounceTime(500),
      switchMap(value => ajaxService.checkPhoneNumber(value)),
      map(valid => valid ? null : { invalid: true, asyncInvalid: true }),
      tap(valid => console.log('Validation result for phone number:', valid)),
      tap(() => console.log('Control Status After Validation:', control))
    );
  };
};

const emailAsyncValidator = (ajaxService: AjaxService) => {
  return (control: FormControl) => {
    
    return control.valueChanges.pipe(
      debounceTime(0),
      // switchMap(value => ajaxService.checkEmail(value)),
      switchMap(value => {
        // console.log("Email being checked:", value);
        // console.log("ajaxService.checkEmail(value):", ajaxService.checkEmail(value));
        // ajaxService.checkEmail(value).subscribe(event => console.log(event));
        return ajaxService.checkEmail(value);
      }),
      map(valid => { valid ? null : { invalid: true, asyncInvalid: true }; 
        const error = valid ? null : { invalid: true, asyncInvalid: true }; 
        console.log("Email error: ", error); 
        console.log("Email valid: ", valid);
        console.log("FormControl: ", control);

        return valid;
      }),
      tap(result => console.log('Validation result for email:', result))
    );
  };
};

export {
  mobileNumberValidator,
  startsWithSpaceValidator,
  mobileNumberAsyncValidator,
  emailAsyncValidator
};
