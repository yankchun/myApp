import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormWizardService {
  form: FormGroup;

  private formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      generalDetails: this.fb.group({
        name: [''],
        phoneNumber: [''],
        email: [''],
        gender: [''],
        dob: ['']
      }),
      personalDetails: this.fb.group({
        introduction: [''],
        hobbies: []
      })
    });
  }

  markFormAsSubmitted(): void {
    this.formSubmitted = true;
  }

  isFormSubmitted(): boolean {
    return this.formSubmitted;
  }

  validateGeneralDetails(): boolean {
    const details = this.generalDetails.value;
    const requiredFields = ['name', 'phoneNumber', 'email', 'gender', 'dob'];
    return requiredFields.every(field => details[field] && details[field].trim() !== '');
  }

  validatePersonalDetails(): boolean {
    const details = this.personalDetails.value;
    const requiredFields = ['introduction'];
    return requiredFields.every(field => details[field] && details[field].trim() !== '');
  }

  get generalDetails() {
    return this.form.get('generalDetails') as FormGroup;
  }

  get personalDetails() {
    return this.form.get('personalDetails') as FormGroup;
  }
}
