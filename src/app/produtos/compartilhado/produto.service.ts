import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Produto } from './produto';
import { Comprar } from './comprar';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService{
  constructor(private http: HttpClient) { }

  async get() {
   return await this.http.get<Produto[]>('http://localhost:8080/estoque/api/produtos').toPromise();
  }
  
  async filterByDescription(description: string) {
    return await this.http.get<Produto[]>(`http://localhost:3000/produtos?description=${description}`).toPromise();
  }

  async getByid(id: number) {
    return await this.http.get<Produto>(`http://localhost:8080/estoque/api/produtos/${id}`).toPromise();
  }
}