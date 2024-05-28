import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GeneralDetailsComponent } from './steps/general-details/general-details.component';
import { PersonalDetailsComponent } from './steps/personal-details/personal-details.component';
import { ReviewSubmitComponent } from './steps/review-submit/review-submit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GeneralDetailsComponent,
    PersonalDetailsComponent,
    ReviewSubmitComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
