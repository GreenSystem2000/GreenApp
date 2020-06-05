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

  informacoesCompras     : Comprar;

  indice                 : number[] = []
  produtoId              : number[] = []
  produtoSelecionado     : string[] = []
  precoProduto           : number[] = []
  quantidadeSelecionada  : number[] = []
  prodStatus             : number[] = []
  qtdItem                : number[] = []
  quantidadeUltimaSelecao: number[] = [] 

  produtos               : Produto[] = []
  
  constructor(private produtoService: ProdutoService, private authService: AutenticadoService) {
    this.produtoService.get().subscribe(resposta => {
      this.produtos = resposta
      this.persistenciaDeDados()
    });
  }
  
  ngOnInit() { }
  
  ionViewWillEnter() {
    this.isUserAuthenticated = this.authService.isUserAuthenticated()
    this.atualizarDados()
    
    localStorage.getItem('indice') && localStorage.removeItem('indice')
  }

  buscarProduto(mostrar){
    const texto = mostrar.target.value;
    this.textobuscar = texto
  }

  persistenciaDeDados() {
    if (localStorage.getItem('prodSelecionados') == undefined) {
      for (let i = 0; i < this.produtos.length; i++) {
        this.prodStatus.push(0)
        this.quantidadeUltimaSelecao.push(1)
      }
    } else {
      let convertProdSToJSON = JSON.parse(localStorage.getItem('prodSelecionados'))

      this.indice                  = convertProdSToJSON.indice
      this.produtoId               = convertProdSToJSON.produtoId
      this.produtoSelecionado      = convertProdSToJSON.produtos
      this.prodStatus              = convertProdSToJSON.prodStatus
      this.precoProduto            = convertProdSToJSON.preco
      this.quantidadeSelecionada   = convertProdSToJSON.quantidade
      this.quantidadeUltimaSelecao = convertProdSToJSON.quantidadeUltimaSelecao
    }
  }

  atualizarDados() {
    if (localStorage.getItem('prodSelecionados') != undefined) {
      let convertProdSToJSON = JSON.parse(localStorage.getItem('prodSelecionados'))

      this.indice                  = convertProdSToJSON.indice
      this.produtoId               = convertProdSToJSON.produtoId
      this.produtoSelecionado      = convertProdSToJSON.produtos
      this.prodStatus              = convertProdSToJSON.prodStatus
      this.precoProduto            = convertProdSToJSON.preco
      this.quantidadeSelecionada   = convertProdSToJSON.quantidade
      this.quantidadeUltimaSelecao = convertProdSToJSON.quantidadeUltimaSelecao
    }
  }

  adicionarAoCarrinho(produtoId, produtoDescricao, produtoPreco, quantidadeSelecionada, index) {
    this.prodStatus[index] = 1
    this.quantidadeUltimaSelecao[index] = parseInt(quantidadeSelecionada)

    let precoFloat = parseFloat(produtoPreco.replace(',', '.'))

    this.produtoId.push(produtoId)
    this.produtoSelecionado.push(produtoDescricao)
    this.precoProduto.push(precoFloat * quantidadeSelecionada)
    this.quantidadeSelecionada.push(parseInt(quantidadeSelecionada))
    this.indice.push(index)

    this.atualizarProdSelecionados()
  }

  removerDoCarrinho(produtoId, produtoDescricao, produtoPreco, quantidadeSelecionada, index) {
    this.prodStatus[index] = 0
    this.quantidadeUltimaSelecao[index] = 1
    let precoFloat = parseFloat(produtoPreco.replace(',', '.'))

    this.produtoId.splice(this.produtoId.indexOf(parseInt(produtoId)), 1);
    this.produtoSelecionado.splice(this.produtoSelecionado.indexOf(produtoDescricao), 1);
    this.precoProduto.splice(this.precoProduto.indexOf(precoFloat * quantidadeSelecionada), 1);
    this.quantidadeSelecionada.splice(this.quantidadeSelecionada.indexOf(parseInt(quantidadeSelecionada)), 1);
    this.indice.splice(this.indice.indexOf(index), 1);

    this.atualizarProdSelecionados()
  }

  setProductIndice(index) {
    localStorage.setItem('indice', index)
  }

  atualizarProdSelecionados() {
    this.informacoesCompras = {
      username               : localStorage.getItem('username'),
      indice                 : this.indice,
      produtoId              : this.produtoId,
      produtos               : this.produtoSelecionado,
      preco                  : this.precoProduto,
      quantidade             : this.quantidadeSelecionada,
      prodStatus             : this.prodStatus,
      quantidadeUltimaSelecao: this.quantidadeUltimaSelecao
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