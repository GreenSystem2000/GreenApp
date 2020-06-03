import { Component, OnInit } from '@angular/core';

import { AutenticadoService } from '../compartilhado/autenticado.service';

import { Login } from '../compartilhado/login';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.page.html',
  styleUrls: ['./minha-conta.page.scss'],
})
export class MinhaContaPage implements OnInit {
  reloaded: boolean;

  conta: any[] = [];

  informacoesLogin: string[] = []
  exibirLogin: object
  isUserAuthenticated: boolean = false;
  activatedRoute: any;
  
  username: string;

  constructor(private authService: AutenticadoService, private route: ActivatedRoute) { }

  ionViewWillEnter() {
    this.username = localStorage.getItem('username')
    this.authService.getMinhaconta(this.username).subscribe(conta => {
      if (this.conta.length == 0) {
        this.conta.push(conta);
      }
    }, err => {
      console.log('Não foi possível buscar o usuário ', err)
    })

    console.log('conta > ', this.conta)

    this.isUserAuthenticated = this.authService.isUserAuthenticated();

    if (this.isUserAuthenticated) {
      const username = localStorage.getItem('username')
    }
  }

  ngOnInit() {
    this.getStatusAuth()
  }

  getStatusAuth() {
    console.log('User autenticado >>> ', this.authService.isUserAuthenticated())
  }

  // getUsuarioUsername() {
  //   const username = this.route.snapshot.paramMap.get('produtoId');
  //   if (id) {
  //     return parseInt(id);
  //   }
  //   return null;
  // }

  // async getProduto(id: number) {
  //   const produto = await this.produtoService.getByid(id);
  //   return produto;
  // }
}