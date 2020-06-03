import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


import { LoginBloqueadoComponent } from './../../autenticar/login-bloqueado/login-bloqueado.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [
   
    LoginBloqueadoComponent
  ],
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
 
    LoginBloqueadoComponent
  ],
  entryComponents: [
    LoginBloqueadoComponent
  ]


})
export class CompartilhadoModule { }
