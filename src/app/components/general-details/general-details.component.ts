import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AjaxService } from 'src/app/services/ajax.service';
import { FormWizardService } from 'src/app/services/form-wizard.service';
import { ProgressStepsService } from 'src/app/services/progress-steps.service';
import { loadingConfig } from 'src/app/shared/loading-config';
import { emailAsyncValidator, mobileNumberAsyncValidator, mobileNumberValidator, startsWithSpaceValidator } from 'src/app/shared/validator';

@Component({
  selector: 'app-general-details',
  templateUrl: './general-details.component.html',
  styleUrls: ['./general-details.component.scss']
})
export class GeneralDetailsComponent implements OnInit {

  generalDetailsForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, startsWithSpaceValidator]],
    phoneNumber: ['', [Validators.required, mobileNumberValidator], [mobileNumberAsyncValidator(this.ajaxService, this.setLoading.bind(this))]],
    email: ['', [Validators.required, Validators.email], [emailAsyncValidator(this.ajaxService, this.setLoading.bind(this))]],
    gender: ['', [Validators.required]],
    dob: ['', [Validators.required]]
  });
  isLoading = false;
  config = loadingConfig;

  constructor(
    public formWizardService: FormWizardService,
    private progressStepsService: ProgressStepsService,
    public ajaxService: AjaxService, 
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.progressStepsService.setCurrentStep('generalDetails');
  }

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  initializeForm() {
    const generalDetails = this.formWizardService.generalDetails.value;

    if (generalDetails) {
      this.generalDetailsForm.patchValue(generalDetails);
    }

  }

  get generalDetailsInfo() {
    return this.generalDetailsForm.controls;
  }

  nextStep() {
    if (this.generalDetailsForm.valid) {
      this.isLoading = true;
      this.ajaxService.performAsyncCheck().subscribe({
        next: () => {
          this.formWizardService.generalDetails.patchValue(this.generalDetailsForm.value);
        },
        error: (error) => {
          console.error('Error during validation:', error.message);
        },
        complete: () => {
          this.router.navigate(['/personal-details']);
          this.isLoading = false;
        }
      });
    } else {
      this.generalDetailsForm.markAllAsTouched();
    }
  }

}
