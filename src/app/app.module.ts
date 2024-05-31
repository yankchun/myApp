import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GeneralDetailsComponent } from './components/general-details/general-details.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { ReviewSubmitComponent } from './components/review-submit/review-submit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { CompleteComponent } from './components/complete/complete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProgressStepsComponent } from './components/@shared/progress-steps/progress-steps.component';
import { WizardRedirectComponent } from './components/wizard-redirect/wizard-redirect.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogComponent } from './components/@shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    GeneralDetailsComponent,
    PersonalDetailsComponent,
    ReviewSubmitComponent,
    CompleteComponent,
    ProgressStepsComponent,
    WizardRedirectComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
