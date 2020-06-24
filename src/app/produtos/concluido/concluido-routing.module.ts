import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConcluidoPage } from './concluido.page';

const routes: Routes = [
  {
    path: '',
    component: ConcluidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConcluidoPageRoutingModule {}
