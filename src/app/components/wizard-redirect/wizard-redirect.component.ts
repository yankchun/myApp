import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormWizardService } from 'src/app/services/form-wizard.service';

@Component({
  selector: 'app-wizard-redirect',
  templateUrl: './wizard-redirect.component.html',
  styleUrls: ['./wizard-redirect.component.scss']
})
export class WizardRedirectComponent implements OnInit {

  constructor(
    private formWizardService: FormWizardService, 
    private router: Router
  ) {}

  ngOnInit() {
    if (this.formWizardService.isFormSubmitted()) {
      this.router.navigate(['/complete']);
    } else if (!this.formWizardService.validateGeneralDetails()) {
      this.router.navigate(['/general-details']);
    } else if (!this.formWizardService.validatePersonalDetails()) {
      this.router.navigate(['/personal-details']);
    } else if (this.formWizardService.validateGeneralDetails() && this.formWizardService.validatePersonalDetails()) {
      this.router.navigate(['/review-submit']);
    } else {
      this.router.navigate(['/general-details']);
    }
  }
}