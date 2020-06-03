import { Component } from '@angular/core';
import { AutenticadoService } from '../autenticar/compartilhado/autenticado.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  verificaLogado: boolean;

  constructor(private authService: AutenticadoService) { }

  ionViewWillEnter() {
    this.verificaLogado = this.authService.isUserAuthenticated()
  }
}
