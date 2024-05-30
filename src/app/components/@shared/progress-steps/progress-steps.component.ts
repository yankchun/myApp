import { Component, OnInit } from '@angular/core';
import { ProgressSteps } from 'src/app/models/progress-steps.model';
import { ProgressStepsService } from 'src/app/services/progress-steps.service';

@Component({
  selector: 'app-progress-steps',
  templateUrl: './progress-steps.component.html',
  styleUrls: ['./progress-steps.component.scss'],
})
export class ProgressStepsComponent implements OnInit {

  steps: ProgressSteps[] = [];

  constructor(private progressStepsService: ProgressStepsService) {}

  ngOnInit(): void {
    this.steps = this.progressStepsService.getSteps();
  }

}
