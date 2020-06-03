import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaProdutosPage } from './lista-produtos.page';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado/compartilhado.module';

const routes: Routes = [
  {
    path: '',
    component: ListaProdutosPage
  }
];

@NgModule({
  imports: [CompartilhadoModule,RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaProdutosPageRoutingModule {}
