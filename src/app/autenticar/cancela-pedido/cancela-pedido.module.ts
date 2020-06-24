import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelaPedidoPageRoutingModule } from './cancela-pedido-routing.module';

import { CancelaPedidoPage } from './cancela-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelaPedidoPageRoutingModule
  ],
  declarations: [CancelaPedidoPage]
})
export class CancelaPedidoPageModule {}
