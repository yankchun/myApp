import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormWizardService {
  form: FormGroup;

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

  get generalDetails() {
    return this.form.get('generalDetails') as FormGroup;
  }

  get personalDetails() {
    return this.form.get('personalDetails') as FormGroup;
  }
}
