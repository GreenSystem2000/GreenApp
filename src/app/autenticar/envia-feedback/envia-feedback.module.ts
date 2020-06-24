import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnviaFeedbackPageRoutingModule } from './envia-feedback-routing.module';

import { EnviaFeedbackPage } from './envia-feedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnviaFeedbackPageRoutingModule
  ],
  declarations: [EnviaFeedbackPage]
})
export class EnviaFeedbackPageModule {}
