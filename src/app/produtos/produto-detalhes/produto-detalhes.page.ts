import { Component, OnInit, Input } from '@angular/core';
import { ProdutoService } from '../compartilhado/produto.service';
import { Produto } from '../compartilhado/produto';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/core/service/toast.service';
import { Comprar } from '../compartilhado/comprar';
import { AutenticadoService } from 'src/app/autenticar/compartilhado/autenticado.service';

@Component({
  selector: 'app-produto-detalhes',
  templateUrl: './produto-detalhes.page.html',
  styleUrls: ['./produto-detalhes.page.scss'],
})
export class ProdutoDetalhesPage implements OnInit {
  isUserAuthenticated    : boolean;
  produto                : Produto;
  indiceAtual            : number

  informacoesCompras     : Comprar;

  indice                 : number[] = []
  produtoId              : number[] = []
  produtoSelecionado     : string[] = []
  precoProduto           : number[] = []
  quantidadeSelecionada  : number[] = []
  prodStatus             : number[] = []
  quantidadeUltimaSelecao: number[] = []

  constructor(private produtoService: ProdutoService, private activatedRoute: ActivatedRoute, private authService: AutenticadoService) {
    this.indiceAtual = parseInt(localStorage.getItem('indice'))
    this.persistenciaDeDados()
  }

  async ngOnInit() { 
    const produtoId = this.getProdutoId();
    this.produto = await this.getProduto(produtoId);
  }

  ionViewWillEnter() {
    this.isUserAuthenticated = this.authService.isUserAuthenticated()
  }

  getProdutoId() {
    const id = this.activatedRoute.snapshot.paramMap.get('produtoId');
    
    if (id) {
      return parseInt(id);
    }
    return null;
  }
  
  async getProduto(id: number) {
    const produto = await this.produtoService.getByid(id);
    return produto;
  }

  persistenciaDeDados() {
    const quantidadeDeProdutos = parseInt(localStorage.getItem('QuantidadeDeProdutos'))

    if (localStorage.getItem('prodSelecionados') == undefined && this.prodStatus.length == 0) {
      for (let i = 0; i < quantidadeDeProdutos; i++) {
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

  adicionarAoCarrinho(produtoDescricao, produtoPreco, quantidadeSelecionada) {
    const idProd = this.activatedRoute.snapshot.paramMap.get('produtoId');
    const precoFloat = parseFloat(produtoPreco.toString().replace(',', '.'))

    this.indice.push(this.indiceAtual)
    this.prodStatus[this.indiceAtual] = 1
    this.quantidadeUltimaSelecao[this.indiceAtual] = parseInt(quantidadeSelecionada)
    this.produtoId.push(parseInt(idProd))
    this.produtoSelecionado.push(produtoDescricao)
    this.precoProduto.push(precoFloat * quantidadeSelecionada)
    this.quantidadeSelecionada.push(parseInt(quantidadeSelecionada))

    this.atualizarProdSelecionados()
  }

  removerDoCarrinho(produtoDescricao, produtoPreco, quantidadeSelecionada) {
    const idProd = this.activatedRoute.snapshot.paramMap.get('produtoId');
    const precoFloat = parseFloat(produtoPreco.toString().replace(',', '.'))

    this.indice.splice(this.indice.indexOf(this.indiceAtual), 1);
    this.prodStatus[this.indiceAtual] = 0
    this.quantidadeUltimaSelecao[this.indiceAtual] = 1
    this.produtoId.splice(this.produtoId.indexOf(parseInt(idProd)), 1);
    this.produtoSelecionado.splice(this.produtoSelecionado.indexOf(produtoDescricao), 1);
    this.precoProduto.splice(this.precoProduto.indexOf(precoFloat * quantidadeSelecionada), 1);
    this.quantidadeSelecionada.splice(this.quantidadeSelecionada.indexOf(quantidadeSelecionada), 1);

    this.atualizarProdSelecionados()
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
    console.log(this.quantidadeUltimaSelecao[0])
  }

  diminuirQtd(index) {
    this.quantidadeUltimaSelecao[index]--
    console.log(this.quantidadeUltimaSelecao)
  }
}