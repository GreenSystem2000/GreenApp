import { ToastService } from 'src/app/core/service/toast.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoPessoalModel } from '../compartilhado/infoPessoal.model';
import { CompraService } from '../compartilhado/compra.service';

@Component({
  selector: 'app-finalizarcarrinho',
  templateUrl: './finalizarcarrinho.page.html',
  styleUrls: ['./finalizarcarrinho.page.scss'],
})
export class FinalizarcarrinhoPage implements OnInit {
  
  infoPessoal: InfoPessoalModel = new InfoPessoalModel();
  
  infoComprador: object

  itens: any[] = [];

  constructor(private router: Router, private toast: ToastService, private compraService: CompraService) {
    this.compraService.get().subscribe(itens => {
      console.log('itens > ', itens)
    })
    console.log(this.itens.length == 0)
  }

  ngOnInit() { }

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
}