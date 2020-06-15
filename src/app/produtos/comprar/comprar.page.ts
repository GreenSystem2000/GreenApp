import { Component, OnInit } from '@angular/core';
import { Produto } from '../compartilhado/produto';
import { Comprar } from '../compartilhado/comprar';
import { AutenticadoService } from 'src/app/autenticar/compartilhado/autenticado.service';

@Component({
  selector   : 'app-comprar',
  templateUrl: './comprar.page.html',
  styleUrls  : ['./comprar.page.scss'],
})
export class ComprarPage implements OnInit {

          convertProdSToJSON    : any     
          
          indice                 : number[] = []
          produtoId              : number[] = []
          produtoSelecionados    : string[] = []
          precoProduto           : number[] = []
          quantidadeSelecionada  : number[] = []
          prodStatus             : number[] = []
          quantidadeUltimaSelecao: number[] = [] 

          precoConvertido        : number[] = []
          total                  : number

          isUserAuthenticated    : boolean
          

          informacoesCompras     : Comprar

  checkForSelection = localStorage.getItem('prodSelecionados');
  
  ngOnInit() { }

  constructor(private authService: AutenticadoService) {
    this.selectedProducts()
    this.calcularPrecoTotal()

    this.isUserAuthenticated = this.authService.isUserAuthenticated();
  }

  selectedProducts() {
    let convertProdSToJSON = JSON.parse(localStorage.getItem('prodSelecionados'))
    
    this.indice                  = convertProdSToJSON.indice
    this.produtoId               = convertProdSToJSON.produtoId
    this.produtoSelecionados     = convertProdSToJSON.produtos
    this.precoProduto            = convertProdSToJSON.preco
    this.quantidadeSelecionada   = convertProdSToJSON.quantidade
    this.prodStatus              = convertProdSToJSON.prodStatus
    this.quantidadeUltimaSelecao = convertProdSToJSON.quantidadeUltimaSelecao
  }
  
  calcularPrecoTotal() {
    this.total = this.precoProduto.reduce((totPreco, preco) => {
      return totPreco + preco
    }, 0)
  }

  removerDoCarrinho(produtoDescricao, produtoPreco, quantidadeSelecionada, produtoId, indice) {
    this.prodStatus[indice] = 0
    this.quantidadeUltimaSelecao[indice] = 1

    this.produtoId.splice(this.produtoId.indexOf(produtoId), 1);
    this.produtoSelecionados.splice(this.produtoSelecionados.indexOf(produtoDescricao), 1);
    this.precoProduto.splice(this.precoProduto.indexOf(produtoPreco), 1);
    this.quantidadeSelecionada.splice(this.quantidadeSelecionada.indexOf(parseInt(quantidadeSelecionada)), 1);
    this.indice.splice(this.indice.indexOf(indice), 1);

    this.atualizarProdSelecionados()
    this.calcularPrecoTotal()
  }

  atualizarProdSelecionados() {
    this.informacoesCompras = {
      username               : localStorage.getItem('username'),
      indice                 : this.indice,
      produtoId              : this.produtoId,
      produtos               : this.produtoSelecionados,
      preco                  : this.precoProduto,
      quantidade             : this.quantidadeSelecionada,
      prodStatus             : this.prodStatus,
      quantidadeUltimaSelecao: this.quantidadeUltimaSelecao
    }
    
    localStorage.setItem('prodSelecionados', JSON.stringify(this.informacoesCompras))
  }
}
