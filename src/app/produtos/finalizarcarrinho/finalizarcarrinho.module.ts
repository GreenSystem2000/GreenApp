import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalizarcarrinhoPageRoutingModule } from './finalizarcarrinho-routing.module';

import { FinalizarcarrinhoPage } from './finalizarcarrinho.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalizarcarrinhoPageRoutingModule
  ],
  declarations: [FinalizarcarrinhoPage]
})
export class FinalizarcarrinhoPageModule {}
