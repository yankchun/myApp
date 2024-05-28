import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormWizardService } from 'src/app/services/form-wizard.service';

@Component({
  selector: 'app-general-details',
  templateUrl: './general-details.component.html',
  styleUrls: ['./general-details.component.css']
})
export class GeneralDetailsComponent implements OnInit {

  constructor(public formWizardService: FormWizardService, private router: Router) { }

  ngOnInit(): void {
  }

  nextStep() {
    if (this.formWizardService.generalDetails.valid) {
      this.router.navigate(['/personal-details']);
    } else {
      this.formWizardService.generalDetails.markAllAsTouched();
    }
  }
}
