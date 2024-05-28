import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormWizardService } from 'src/app/services/form-wizard.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {

  constructor(public formWizardService: FormWizardService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.addHobby(); // Add a default hobby field
  }

  get hobbies(): FormArray {
    return this.formWizardService.personalDetails.get('hobbies') as FormArray;
  }

  addHobby() {
    this.hobbies.push(this.fb.control('', Validators.required));
  }

  removeHobby(index: number) {
    this.hobbies.removeAt(index);
  }

  nextStep() {
    if (this.formWizardService.personalDetails.valid) {
      this.router.navigate(['/review-submit']);
    } else {
      this.formWizardService.personalDetails.markAllAsTouched();
    }
  }

  previousStep() {
    this.router.navigate(['/general-details']);
  }
}
