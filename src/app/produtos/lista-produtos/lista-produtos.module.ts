import { CompartilhadoModule } from './../../compartilhado/compartilhado/compartilhado.module';
import { NgModule } from '@angular/core';


import { ListaProdutosPage } from './lista-produtos.page';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';


const routes: Routes = [
  {
    path: '',
    component: ListaProdutosPage 
  }
];

@NgModule({
  imports: [
    PipesModule,
    CompartilhadoModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaProdutosPage]
})
export class ListaProdutosPageModule { }
