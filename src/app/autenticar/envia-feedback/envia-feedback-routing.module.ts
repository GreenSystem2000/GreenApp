import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnviaFeedbackPage } from './envia-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: EnviaFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnviaFeedbackPageRoutingModule {}
