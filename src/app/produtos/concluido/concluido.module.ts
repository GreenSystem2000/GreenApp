import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConcluidoPageRoutingModule } from './concluido-routing.module';

import { ConcluidoPage } from './concluido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConcluidoPageRoutingModule
  ],
  declarations: [ConcluidoPage]
})
export class ConcluidoPageModule {}
