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

@NgModule({
  declarations: [
    AppComponent,
    GeneralDetailsComponent,
    PersonalDetailsComponent,
    ReviewSubmitComponent,
    CompleteComponent,
    ProgressStepsComponent,
    WizardRedirectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
