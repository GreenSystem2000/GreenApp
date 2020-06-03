import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinhaContaPageRoutingModule } from './minha-conta-routing.module';

import { MinhaContaPage } from './minha-conta.page';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado/compartilhado.module';

@NgModule({
  imports: [
    CompartilhadoModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MinhaContaPageRoutingModule
  ],
  declarations: [MinhaContaPage]
})
export class MinhaContaPageModule {}
