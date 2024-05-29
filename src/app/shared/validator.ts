import { FormControl } from "@angular/forms";

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

export {
  mobileNumberValidator,
  startsWithSpaceValidator,
};
