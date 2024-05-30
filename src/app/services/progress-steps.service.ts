import { Injectable } from '@angular/core';
import { ProgressSteps } from '../models/progress-steps.model';

@Injectable({
    providedIn: 'root',
})
export class ProgressStepsService {
    private steps: ProgressSteps[] = [];

    constructor() {
        this.initializeSteps();
    }

    private initializeSteps() {
        const steps: ProgressSteps[] = [
            { id: 'generalDetails', title: 'General Details', completed: false, current: false },
            { id: 'personalDetails', title: 'Personal Details', completed: false, current: false },
            { id: 'reviewSubmit', title: 'Review & Submit', completed: false, current: false },
        ];

        this.steps = [...steps];
    }

    setCurrentStep(currentStepId: string) {
        let stepFound = false;
        this.steps.forEach((step) => {
            if (step.id === currentStepId) {
                step.current = true;
                step.completed = false;
                stepFound = true;
            } else if (!stepFound) {
                step.completed = true;
                step.current = false;
            } else {
                step.completed = false;
                step.current = false;
            }
        });
    }

    getSteps() {
        return this.steps;
    }
}