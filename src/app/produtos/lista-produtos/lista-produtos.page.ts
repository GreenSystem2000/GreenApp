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
  textobuscar                        = ''

  informacoesCompras     : Comprar;

  indice                 : number[]  = []
  produtoId              : number[]  = []
  produtoSelecionado     : string[]  = []
  precoProduto           : number[]  = []
  quantidadeSelecionada  : number[]  = []
  prodStatus             : number[]  = []
  qtd                    : number = 1
  quantidadeUltimaSelecao: number[]  = [] 

  produtos               : Produto[] = []
  
  precoReais             : number[]  = []

  constructor(private produtoService: ProdutoService, private authService: AutenticadoService) {
    this.produtoService.get().subscribe(resposta => {
      this.produtos = resposta

      localStorage.setItem('QuantidadeDeProdutos', this.produtos.length.toString());
    });
  }
  
  ngOnInit() { }
  
  ionViewWillEnter() {
    this.esvaziarDadosArrays()
    // Se não houver nada selecionado, execute esse método

    this.isUserAuthenticated = this.authService.isUserAuthenticated()
    this.atualizarDados()
    
    localStorage.getItem('indice') && localStorage.removeItem('indice')
    this.persistenciaDeDados()
  }

  esvaziarDadosArrays() {
    const quantidadeDeProdutos = parseInt(localStorage.getItem('QuantidadeDeProdutos'))

    if (localStorage.getItem('prodSelecionados') == null) {
      for (let i = 0; i < quantidadeDeProdutos; i++) {
        this.indice.pop()
        this.produtoId.pop()
        this.produtoSelecionado.pop()
        this.prodStatus.pop()
        this.precoProduto.pop()
        this.quantidadeSelecionada.pop()
        this.quantidadeUltimaSelecao.pop()
      }
      for (let i = 0; i < quantidadeDeProdutos; i++) {
        this.prodStatus.push(0)
        this.quantidadeUltimaSelecao.push(1)
      }
    }
  }

  buscarProduto(mostrar){
    const texto = mostrar.target.value;
    this.textobuscar = texto
  }

  persistenciaDeDados() {
    const quantidadeDeProdutos = parseInt(localStorage.getItem('QuantidadeDeProdutos'))
    
    if (localStorage.getItem('prodSelecionados') == null && this.quantidadeUltimaSelecao.length == 0) {
      for (let i = 0; i < quantidadeDeProdutos; i++) {
        this.prodStatus.push(0)
        this.quantidadeUltimaSelecao.push(1)
      }
    } else if (localStorage.getItem('prodSelecionados') != null) {
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

    let precoFloat = parseFloat(produtoPreco.toString().replace(',', '.'))

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
    let precoFloat = parseFloat(produtoPreco.toString().replace(',', '.'))

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

  adicionarQtd(index) {
    this.quantidadeUltimaSelecao[index]++
    console.log(this.quantidadeUltimaSelecao)
  }

  diminuirQtd(index) {
    this.quantidadeUltimaSelecao[index]--
    console.log(this.quantidadeUltimaSelecao)
  }
}