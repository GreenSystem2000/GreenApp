import { ToastService } from 'src/app/core/service/toast.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoPessoalModel } from '../compartilhado/infoPessoal.model';
import { CompraService } from '../compartilhado/compra.service';

import * as jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-finalizarcarrinho',
  templateUrl: './finalizarcarrinho.page.html',
  styleUrls: ['./finalizarcarrinho.page.scss'],
})
export class FinalizarcarrinhoPage implements OnInit {
  
  infoPessoal  : InfoPessoalModel = new InfoPessoalModel();
  
  infoComprador: object

  itens        : any[] = [];
  parcelaTotal : number = 1
  precoTotal   : number

  display = 'flex';

  boletoDownloaded: boolean;

  constructor(private router: Router, private toast: ToastService, private compraService: CompraService) { }

  ngOnInit() {
    this.calcularTotal()
  }

  ionViewWillEnter() {
    this.boletoDownloaded = false;
  }

  changeStateDownloaded() {
    if (!this.boletoDownloaded) {
      this.boletoDownloaded = true;
    } else {
      this.boletoDownloaded = false;
    }
  }

  focus() {
    if (this.display == 'flex') {
      this.display = 'none'
    } else {
      this.display = 'flex'
    }
  }

  informacoes() {
    let convertProdSToJSON = JSON.parse(localStorage.getItem('prodSelecionados'))

    let produtos: any[] = []

    if (this.itens.length == 0) {
      for (let i = 0; i < convertProdSToJSON.produtos.length; i++) {
        let itens = {
          "produto": {
            id: convertProdSToJSON.produtoId[i],
            descricao: convertProdSToJSON.produtos[i]
          },
          quantidade: convertProdSToJSON.quantidade[i],
          precototal: convertProdSToJSON.preco[i]
        }

        this.itens.push(itens)
      }
    }

    let enviarParaApi = {
      itens: this.itens,
      total: convertProdSToJSON.preco.reduce((total, preco) => {
        return total + preco
      }, 0),
      username: convertProdSToJSON.username
    }

    this.compraService.post(enviarParaApi).subscribe(_ => {
      console.log('Enviando para API conteudo > ' , enviarParaApi)
    })
  }

  validate(): boolean {
    const cardNumber = /^\d{4}\-\d{4}\-\d{4}\-\d{4}$/
    const cvv        = /^[0-9]{3}$/
    const cpf        = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
    const email      = /^[\w-\.]+@([\w-]+\.)+[\w-]{3}$/
    //regex

    if (this.display == 'flex') {
      return cardNumber.test(this.infoPessoal.cardNumber) != undefined &&
            this.infoPessoal.nomeImpresso                 != undefined || null &&
            cpf.test(this.infoPessoal.cpf)                             &&
            email.test(this.infoPessoal.email)                         &&
            cvv.test(this.infoPessoal.cvv)
    } else {
      return cpf.test(this.infoPessoal.cpf) && email.test(this.infoPessoal.email) && this.boletoDownloaded == true
    }
  }

  validateImprimirBoleto() {
    const cpf        = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
    const email      = /^[\w-\.]+@([\w-]+\.)+[\w-]{3}$/
    //regex

    if (this.display == 'none') {
      return cpf.test(this.infoPessoal.cpf) && email.test(this.infoPessoal.email)
    }
  }

  formatarCPF(cpf) {
    this.infoPessoal.cpf = cpf.replace(/[^\d]/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    this.validate()
  }

  formatarCardNumber(cardNumber) {
    this.infoPessoal.cardNumber =  cardNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1-$2-$3-$4")
    this.validate()
  }  

  setParcela(value) {
    this.parcelaTotal = parseInt(value)
  }

  calcularTotal() {
    let convertProdSToJSON = JSON.parse(localStorage.getItem('prodSelecionados'))

    this.precoTotal = convertProdSToJSON.preco.reduce((total, preco) => {
      return total + preco
    }, 0)
  }

  downloadPDF() {
    const options = {
      filename: 'boleto.pdf',
      image: { type: 'jpeg' },
      html2canvas: {},
      jsPDF: {orientation: 'portrait'}
    }

    const element: Element = document.getElementById('boletoTable');

    html2pdf()
      .from(element)
      .set(options)
      .save();

    this.changeStateDownloaded()
  }
}