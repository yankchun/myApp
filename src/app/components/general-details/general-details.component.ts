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
    phoneNumber: ['', [Validators.required, mobileNumberValidator], [mobileNumberAsyncValidator(this.ajaxService)]],
    email: ['', [Validators.required, Validators.email], [emailAsyncValidator(this.ajaxService)]],
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

    this.generalDetailsForm.get('phoneNumber')!.statusChanges.subscribe(status => {
      console.log('Phone Number Status:', status);
      console.log('Phone Number Errors:', this.generalDetailsForm.get('phoneNumber'));
    });
  }

  initializeForm() {
    const generalDetails = this.formWizardService.generalDetails.value;
    
    if (generalDetails) {
      if (generalDetails.name) {
        this.generalDetailsInfo['name'].setValue(generalDetails.name);
      }
  
      if (generalDetails.phoneNumber) {
        this.generalDetailsInfo['phoneNumber'].setValue(generalDetails.phoneNumber);
      }

      if (generalDetails.email) {
        this.generalDetailsInfo['email'].setValue(generalDetails.email);
      }

      if (generalDetails.gender) {
        this.generalDetailsInfo['gender'].setValue(generalDetails.gender);
      }

      if (generalDetails.dob) {
        this.generalDetailsInfo['dob'].setValue(generalDetails.dob);
      }
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
          this.formWizardService.generalDetails.setValue(this.generalDetailsForm.value);
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
