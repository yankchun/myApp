import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GeneralDetailsComponent } from './steps/general-details/general-details.component';
import { PersonalDetailsComponent } from './steps/personal-details/personal-details.component';
import { ReviewSubmitComponent } from './steps/review-submit/review-submit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent,
    GeneralDetailsComponent,
    PersonalDetailsComponent,
    ReviewSubmitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
