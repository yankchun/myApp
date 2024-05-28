import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormWizardService } from 'src/app/services/form-wizard.service';

@Component({
  selector: 'app-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.css']
})
export class ReviewSubmitComponent {

  constructor(public formWizardService: FormWizardService, private router: Router) { }

  previousStep() {
    this.router.navigate(['/personal-details']);
  }

  onSubmit() {
    if (this.formWizardService.form.valid) {
      console.log(this.formWizardService.form.value);
      // Here you would typically send the form data to a backend service
    } else {
      this.formWizardService.form.markAllAsTouched();
    }
  }
}
