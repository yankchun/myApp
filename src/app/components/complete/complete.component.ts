import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormWizardService } from 'src/app/services/form-wizard.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent {

  constructor(
    public formWizardService: FormWizardService,
    private router: Router
  ) { }

  home() {
    this.router.navigate(['/general-details']);
  }

}
