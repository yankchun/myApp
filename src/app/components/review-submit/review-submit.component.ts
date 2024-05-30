import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormWizardService } from 'src/app/services/form-wizard.service';
import { ProgressStepsService } from 'src/app/services/progress-steps.service';
import { loadingConfig } from 'src/app/shared/loading-config';

@Component({
  selector: 'app-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.scss']
})
export class ReviewSubmitComponent implements OnInit {

  isLoading = false;
  config = loadingConfig;

  constructor(
    public formWizardService: FormWizardService,
    private progressStepsService: ProgressStepsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.formWizardService.validateGeneralDetails()) {
      this.router.navigate(['/general-details']);
    } else if (!this.formWizardService.validatePersonalDetails()) {
      this.router.navigate(['/personal-details']);
    }
    this.progressStepsService.setCurrentStep('reviewSubmit');
  }

  previousStep() {
    this.isLoading = true;
    this.router.navigate(['/personal-details']);
  }

  onSubmit() {
    if (this.formWizardService.form.valid) {
      this.formWizardService.markFormAsSubmitted();
      console.log('Submitted Form Values:', this.formWizardService.form.value);
      this.router.navigate(['/complete']);
    } else {
      this.formWizardService.form.markAllAsTouched();
    }
  }
}
