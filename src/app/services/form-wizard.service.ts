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
        name: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        email: ['', [Validators.required, Validators.email]],
        gender: ['', [Validators.required]],
        dob: ['', [Validators.required]]
      }),
      personalDetails: this.fb.group({
        introduction: ['', [Validators.required]],
        hobbies: this.fb.array([])
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
