import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralDetailsComponent } from './components/general-details/general-details.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { ReviewSubmitComponent } from './components/review-submit/review-submit.component';
import { CompleteComponent } from './components/complete/complete.component';

const routes: Routes = [
  { path: '', redirectTo: '/general-details', pathMatch: 'full' },
  { path: 'general-details', component: GeneralDetailsComponent },
  { path: 'personal-details', component: PersonalDetailsComponent },
  { path: 'review-submit', component: ReviewSubmitComponent },
  { path: 'complete', component: CompleteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
