import { Component, OnInit, ɵCompiler_compileModuleAsync__POST_R3__ } from '@angular/core';

@Component({
  selector: 'app-envia-feedback',
  templateUrl: './envia-feedback.page.html',
  styleUrls: ['./envia-feedback.page.scss'],
})
export class EnviaFeedbackPage implements OnInit {

  nome    : string
  email   : string
  telefone: string
  celular : string
  assunto : string
  mensagem: string

  constructor() { }

  formatTelefone() {
    this.telefone = this.telefone.replace(/[^\d]/g, "").replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
    this.validate()
  }

  formatCelular() {
    this.celular = this.celular.replace(/[^\d]/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    this.validate()
  }

  validate() {
    const telefone = /^\(\d{2}\) \d{4}\-\d{4}$/ 
    const email    = /^[\w-\.]+@([\w-]+\.)+[\w-]{3}$/
    const celular  = /^\(\d{2}\) \d{5}\-\d{4}$/

    return this.nome != undefined       &&
           email.test(this.email)       &&
           telefone.test(this.telefone) &&
           celular.test(this.celular)   &&
           this.assunto != undefined    &&
           this.mensagem != undefined
  }

  ngOnInit() {
  }
}