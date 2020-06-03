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

          produtoId             : number[] = []
          produtoSelecionados   : string[] = []
          prodStates            : number[] = []
          precoProduto          : number[] = []

          precoConvertido       : number[] = []
          total                 : number

          isUserAuthenticated   : boolean
          
          quantidadeSelecionada:  number[] = []

          informacoesCompras   :  Comprar

  ngOnInit() { }

  constructor(private authService: AutenticadoService) {
    this.selectedProducts()
    this.calcularPrecoTotal()

    this.isUserAuthenticated = this.authService.isUserAuthenticated();
  }

  selectedProducts() {
    this.convertProdSToJSON     = JSON.parse(localStorage.getItem('prodSelecionados'))

    this.produtoId              = this.convertProdSToJSON.produtoId
    this.produtoSelecionados    = this.convertProdSToJSON.produtos
    this.prodStates             = this.convertProdSToJSON.prodStates
    this.precoProduto           = this.convertProdSToJSON.preco
    this.quantidadeSelecionada  = this.convertProdSToJSON.quantidade
  }
  
  calcularPrecoTotal() {
    this.total = this.precoProduto.reduce((totPreco, preco) => {
      return totPreco + preco
    }, 0)
  }

  removerDoCarrinho(produtoDescricao, produtoPreco, quantidadeSelecionada, produtoId) {
    this.prodStates[produtoId - 1] = 0

    this.produtoId.splice(this.produtoId.indexOf(produtoId), 1);
    this.produtoSelecionados.splice(this.produtoSelecionados.indexOf(produtoDescricao), 1);
    this.precoProduto.splice(this.precoProduto.indexOf(produtoPreco), 1);
    this.quantidadeSelecionada.splice(this.quantidadeSelecionada.indexOf(parseInt(quantidadeSelecionada)), 1);

    this.informacoesCompras = {
      username  : localStorage.getItem('username'),
      preco     : this.precoProduto,
      prodStates: this.prodStates,
      produtoId : this.produtoId,
      produtos  : this.produtoSelecionados,
      quantidade: this.quantidadeSelecionada
    }

    localStorage.setItem('prodSelecionados', JSON.stringify(this.informacoesCompras))

    this.calcularPrecoTotal()
  }
}
