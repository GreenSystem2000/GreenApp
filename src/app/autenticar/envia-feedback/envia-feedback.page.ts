import { Component, OnInit} from '@angular/core';
import { EnviaFeedbackService } from '../compartilhado/envia-feedback.service';

@Component({
  selector: 'app-envia-feedback',
  templateUrl: './envia-feedback.page.html',
  styleUrls: ['./envia-feedback.page.scss'],
})
export class EnviaFeedbackPage implements OnInit {

  nome      : string
  email     : string
  telefone  : string
  celular   : string
  assunto   : string
  mensagem  : string

  sendStatus: number = 0

  constructor(private enviaFeedbackService: EnviaFeedbackService) { }

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

  sendEmail() {
    const feedback = {
      "body": "<br>Telefone:  " + this.telefone +
              "<br>Celular: " + this.celular +
              "<br>Email: " + this.email +
              "<br><br>" + this.mensagem,
      "name": this.nome,
      "subject": this.assunto
    }

    this.enviaFeedbackService.enviarEmail(feedback).subscribe(_ => {
      console.info('Email enviado com sucesso!')
      this.sendStatus = 1;
    }, err => {
      console.error('Houve uma falha ao enviar o email! > ' , err)
      this.sendStatus = 0;
    })

  }

  ngOnInit() {
  }
}