import { ToastService } from './../../core/service/toast.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conta } from './../compartilhado/conta';
import { AutenticadoService } from '../compartilhado/autenticado.service';
@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage implements OnInit {
  contaModel: Conta = new Conta();
  constructor(private autenticadoService: AutenticadoService, private router: Router, private toast: ToastService) { }

  ngOnInit() {
  }
  
     onSubmit() {
      try {

       this.autenticadoService.CriarConta(this.contaModel);
      this.toast.showSuccess('Conta criada com sucesso.');
      this.router.navigate(['/login']);
   
  } catch (error) {
    this.toast.showError('Ocorreu algum erro ao tentar criar a conta');
  }



}
}
