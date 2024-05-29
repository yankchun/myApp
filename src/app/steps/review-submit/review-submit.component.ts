import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormWizardService } from 'src/app/services/form-wizard.service';
import { loadingConfig } from 'src/app/shared/loading-config';

@Component({
  selector: 'app-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.css']
})
export class ReviewSubmitComponent {

  isLoading = false;
  config = loadingConfig;

  constructor(public formWizardService: FormWizardService, private router: Router) { }

  previousStep() {
    this.isLoading = true;
    this.router.navigate(['/personal-details']);
  }

  onSubmit() {
    if (this.formWizardService.form.valid) {
      console.log("Submitted Values: ", this.formWizardService.form.value);
    } else {
      this.formWizardService.form.markAllAsTouched();
    }
  }
}
