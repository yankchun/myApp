import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormWizardService } from 'src/app/services/form-wizard.service';
import { loadingConfig } from 'src/app/shared/loading-config';
import { AjaxService } from 'src/app/services/ajax.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ProgressStepsService } from 'src/app/services/progress-steps.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  @ViewChild('hobbyInput') hobbyInputElement!: ElementRef<HTMLInputElement>;

  faXmark = faXmark;
  personalDetailsForm: FormGroup = this.fb.group({
    introduction: ['', [Validators.required]],
    hobbies: this.fb.array([])
  });
  isLoading = false;
  config = loadingConfig;

  constructor(
    public formWizardService: FormWizardService,
    private progressStepsService: ProgressStepsService,
    public ajaxService: AjaxService, 
    private fb: FormBuilder, 
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.formWizardService.validateGeneralDetails()) {
      this.router.navigate(['/general-details']);
    }
    this.initializeForm();
    this.progressStepsService.setCurrentStep('personalDetails');
  }

  initializeForm() {
    const personalDetails = this.formWizardService.personalDetails.value;
    
    if (personalDetails) {
      if (personalDetails.introduction) {
        this.personalDetailsInfo['introduction'].patchValue(personalDetails.introduction);
      }
  
      if (personalDetails.hobbies && personalDetails.hobbies.length) {
        this.hobbies.clear();
  
        personalDetails.hobbies.forEach((hobby: []) => {
          this.hobbies.push(this.fb.control(hobby, Validators.required));
        });
      }
    }

    if (this.hobbies.length === 0) {
      this.addHobby();
    }
  }

  get personalDetailsInfo() {
    return this.personalDetailsForm.controls;
  }

  get hobbies(): FormArray {
    return this.personalDetailsForm.get('hobbies') as FormArray;
  }

  addHobby(hobby: string = '') {
    if (hobby) {
      this.hobbies.push(this.fb.control(hobby, Validators.required));
    }
    if (this.hobbyInputElement && this.hobbyInputElement.nativeElement) {
      this.hobbyInputElement.nativeElement.value = '';
    }
  }

  removeHobby(index: number) {
    this.hobbies.removeAt(index);
  }

  nextStep() {
    if (this.personalDetailsForm.valid) {
      this.isLoading = true;
      this.ajaxService.performAsyncCheck().subscribe({
        next: () => {
          this.formWizardService.personalDetails.patchValue(this.personalDetailsForm.value);
        },
        error: (error) => {
          console.error('Error during validation:', error.message);
        },
        complete: () => {
          this.router.navigate(['/review-submit']);
          this.isLoading = false;
        }
      });
    } else {
      this.personalDetailsForm.markAllAsTouched();
    }
  }

  previousStep() {
    if (this.personalDetailsForm.valid) {
      this.isLoading = true;
      this.ajaxService.performAsyncCheck().subscribe({
        next: () => {
          this.formWizardService.personalDetails.patchValue(this.personalDetailsForm.value);
        },
        error: (error) => {
          console.error('Error during validation:', error.message);
        },
        complete: () => {
          this.router.navigate(['/general-details']);
          this.isLoading = false;
        }
      });
    } else {
      this.personalDetailsForm.markAllAsTouched();
    }
  }
}
