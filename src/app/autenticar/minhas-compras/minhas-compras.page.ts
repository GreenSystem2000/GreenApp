import { Component, OnInit } from '@angular/core';
import { CompraService } from 'src/app/produtos/compartilhado/compra.service';
import { Compras } from 'src/app/produtos/compartilhado/comprasCliente';

@Component({
  selector: 'app-minhas-compras',
  templateUrl: './minhas-compras.page.html',
  styleUrls: ['./minhas-compras.page.scss'],
})
export class MinhasComprasPage implements OnInit {

  compras: any[] = [];
  compra:  any[] = [];
  
  thereIsPurchase;

  constructor(private compraService: CompraService) { }

  async ngOnInit() {
    this.compras = await this.compraService.get()
    this.compra = this.compras.filter(compra => compra.username == localStorage.getItem('username'))
    
    this.thereIsPurchase = this.compra[0].itens[0].produto != undefined;
  }
}