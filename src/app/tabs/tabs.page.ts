import { Component } from '@angular/core';
import { AutenticadoService } from '../autenticar/compartilhado/autenticado.service';
import { Comprar } from '../produtos/compartilhado/comprar';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  verificaLogado         : boolean;
  informacoesCompras     : Comprar;

  prodStatus             : number[] = []
  quantidadeUltimaSelecao: number[] = []

  constructor(private authService: AutenticadoService) { }

  ionViewWillEnter() {
    this.verificaLogado = this.authService.isUserAuthenticated()
  }

  addToStorage() {
    this.prodSelecionados()
  }

  prodSelecionados() {
    if (localStorage.getItem('prodSelecionados') == null) {
      let quantidadeDeProdutos = parseInt(localStorage.getItem('QuantidadeDeProdutos'))

      for (let i = 0; i < quantidadeDeProdutos; i++) {
        this.prodStatus.push(0)
        this.quantidadeUltimaSelecao.push(1)
      }

      this.informacoesCompras = {
        username               : localStorage.getItem('username'),
        indice                 : [],
        produtoId              : [],
        produtos               : [],
        preco                  : [],
        quantidade             : [],
        prodStatus             : this.prodStatus,
        quantidadeUltimaSelecao: this.quantidadeUltimaSelecao
      }
      
      localStorage.setItem('prodSelecionados', JSON.stringify(this.informacoesCompras))
    }
  }
}