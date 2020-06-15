import { NgModule } from '@angular/core';

import { ProdutoDetalhesPageRoutingModule } from './produto-detalhes-routing.module';

import { ProdutoDetalhesPage } from './produto-detalhes.page';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado/compartilhado.module';

@NgModule({
  imports: [
    ProdutoDetalhesPageRoutingModule,
    CompartilhadoModule
  ],
  declarations: [ProdutoDetalhesPage]
})
export class ProdutoDetalhesPageModule {}
