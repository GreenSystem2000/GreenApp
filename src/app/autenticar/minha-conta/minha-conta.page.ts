import { Component, OnInit } from '@angular/core';

import { AutenticadoService } from '../compartilhado/autenticado.service';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.page.html',
  styleUrls: ['./minha-conta.page.scss'],
})
export class MinhaContaPage implements OnInit {
  conta: any[] = [];

  isUserAuthenticated: boolean = false;
  
  username: string;
  
  constructor(private authService: AutenticadoService) { }

  ionViewWillEnter() {
    this.username = localStorage.getItem('username')

    if (this.username != null) {
      this.authService.getMinhaconta(this.username).subscribe(conta => {
        (this.conta.length == 0) && this.conta.push(conta) 
      }, err => {
        console.log('Não foi possível buscar o usuário ', err)
      })
    }

    this.isUserAuthenticated = this.authService.isUserAuthenticated();
  }

  ngOnInit() { }

  destroyTokenAndUsername() {
    localStorage.removeItem('prodSelecionados')
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    this.conta.pop()

    this.isUserAuthenticated = false
    this.username = ''
  }
}