import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalizarcarrinhoPage } from './finalizarcarrinho.page';

const routes: Routes = [
  {
    path: '',
    component: FinalizarcarrinhoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalizarcarrinhoPageRoutingModule {}
