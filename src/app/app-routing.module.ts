import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralDetailsComponent } from './components/general-details/general-details.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { ReviewSubmitComponent } from './components/review-submit/review-submit.component';
import { CompleteComponent } from './components/complete/complete.component';
import { WizardRedirectComponent } from './components/wizard-redirect/wizard-redirect.component';

const routes: Routes = [
  { path: '', redirectTo: '/redirect', pathMatch: 'full' },
  { path: 'redirect', component: WizardRedirectComponent },
  { path: 'general-details', component: GeneralDetailsComponent },
  { path: 'personal-details', component: PersonalDetailsComponent },
  { path: 'review-submit', component: ReviewSubmitComponent },
  { path: 'complete', component: CompleteComponent },
  { path: '**', redirectTo: '/redirect' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
