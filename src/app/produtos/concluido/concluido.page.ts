import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-concluido',
  templateUrl: './concluido.page.html',
  styleUrls: ['./concluido.page.scss'],
})
export class ConcluidoPage implements OnInit {

  constructor() { }

  ionViewWillEnter() {
    localStorage.removeItem('prodSelecionados')
  }

  ngOnInit() {
  }
}
