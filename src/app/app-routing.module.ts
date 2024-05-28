import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralDetailsComponent } from './steps/general-details/general-details.component';
import { PersonalDetailsComponent } from './steps/personal-details/personal-details.component';
import { ReviewSubmitComponent } from './steps/review-submit/review-submit.component';

const routes: Routes = [
  { path: '', redirectTo: '/general-details', pathMatch: 'full' },
  { path: 'general-details', component: GeneralDetailsComponent },
  { path: 'personal-details', component: PersonalDetailsComponent },
  { path: 'review-submit', component: ReviewSubmitComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
