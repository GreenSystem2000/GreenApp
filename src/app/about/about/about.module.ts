import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutPageRoutingModule } from './about-routing.module';

import { AboutPage } from './about.page';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado/compartilhado.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutPageRoutingModule,
    CompartilhadoModule
  ],
  declarations: [AboutPage]
})
export class AboutPageModule {}
