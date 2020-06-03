import { Component, OnInit, Input } from '@angular/core';
import { ProdutoService } from '../compartilhado/produto.service';
import { Produto } from '../compartilhado/produto';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/core/service/toast.service';
import { Comprar } from '../compartilhado/comprar';

@Component({
  selector: 'app-produto-detalhes',
  templateUrl: './produto-detalhes.page.html',
  styleUrls: ['./produto-detalhes.page.scss'],
})
export class ProdutoDetalhesPage implements OnInit {
  produto: Produto;

  informacoesCompras   :  Comprar;

  produtoId            :  number[] = []
  produtoSelecionado   :  string[] = []
  prodStates           :  number[] = []
  precoProduto         :  number[] = []
  qtdItem              :  number[] = []
  quantidadeSelecionada:  number[] = []

  constructor(private produtoService: ProdutoService, private activatedRoute: ActivatedRoute) { }

  async ngOnInit() { 
    const produtoId = this.getProdutoId();
    this.produto = await this.getProduto(produtoId);
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
}