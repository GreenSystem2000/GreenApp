import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from '../compartilhado/produto.service';
import { Produto } from '../compartilhado/produto';
import { Comprar } from '../compartilhado/comprar';
import { AutenticadoService } from 'src/app/autenticar/compartilhado/autenticado.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.page.html',
  styleUrls: ['./lista-produtos.page.scss'],
})
export class ListaProdutosPage implements OnInit {
  isUserAuthenticated: boolean;
  textobuscar                      = ''

  informacoesCompras   :  Comprar;

  produtoId            :  number[] = []
  produtoSelecionado   :  string[] = []
  prodStates           :  number[] = []
  precoProduto         :  number[] = []
  qtdItem              :  number[] = []
  quantidadeSelecionada:  number[] = []
  
  produtos             : Produto[] = []

  
  constructor(private produtoService: ProdutoService, private authService: AutenticadoService) {
    this.produtoService.get().subscribe(resposta => {
      this.produtos = resposta

      this.persistenciaDeDados()
    });
  }
  
  ngOnInit() { }

  ionViewWillEnter() {
    this.isUserAuthenticated = this.authService.isUserAuthenticated()
  }

  buscarProduto(mostrar){
    const texto = mostrar.target.value;
    this.textobuscar = texto
  }

  persistenciaDeDados() {
    if (localStorage.getItem('prodSelecionados') == undefined) {
      for (let i = 0; i < this.produtos.length; i++) {
        this.prodStates.push(0)
      }
    } else {
      let convertProdSToJSON = JSON.parse(localStorage.getItem('prodSelecionados'))

      this.produtoId             = convertProdSToJSON.produtoId
      this.produtoSelecionado    = convertProdSToJSON.produtos
      this.prodStates            = convertProdSToJSON.prodStates
      this.precoProduto          = convertProdSToJSON.preco
      this.quantidadeSelecionada = convertProdSToJSON.quantidade
    }
  }

  adicionarAoCarrinho(produtoDescricao, produtoPreco, quantidadeSelecionada, index) {
    this.prodStates[index] = 1
    let precoFloat = parseFloat(produtoPreco.replace(',', '.'))

    this.produtoId.push(index + 1)
    this.produtoSelecionado.push(produtoDescricao)
    this.precoProduto.push(precoFloat * quantidadeSelecionada)
    this.quantidadeSelecionada.push(parseInt(quantidadeSelecionada))

    this.atualizarProdSelecionados()
  }

  removerDoCarrinho(produtoDescricao, produtoPreco, quantidadeSelecionada, index) {
    this.prodStates[index] = 0
    let precoFloat = parseFloat(produtoPreco.replace(',', '.'))

    this.produtoId.splice(this.produtoId.indexOf(index + 1), 1);
    this.produtoSelecionado.splice(this.produtoSelecionado.indexOf(produtoDescricao), 1);
    this.precoProduto.splice(this.precoProduto.indexOf(precoFloat * quantidadeSelecionada), 1);
    this.quantidadeSelecionada.splice(this.quantidadeSelecionada.indexOf(parseInt(quantidadeSelecionada)), 1);

    this.atualizarProdSelecionados()
  }

  atualizarProdSelecionados() {
    this.informacoesCompras = {
      username  : localStorage.getItem('username'),
      preco     : this.precoProduto,
      prodStates: this.prodStates,
      produtoId : this.produtoId,
      produtos  : this.produtoSelecionado,
      quantidade: this.quantidadeSelecionada
    }
    
    localStorage.setItem('prodSelecionados', JSON.stringify(this.informacoesCompras))
  }

  setItemQtd(quantidade) {
    for (let i = 1; i <= quantidade; i++) {
      this.qtdItem.push(i)
    }
  }

  clearItemQtd(quantidade) {
    for (let i = 1; i <= quantidade; i++) {
      this.qtdItem.pop()
    }
  }
}