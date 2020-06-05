
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Produto } from './produto';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService{


  constructor(private http: HttpClient) { }

  get() {
   return this.http.get<Produto[]>('http://localhost:8080/estoque/api/produtos');
  }
  
  filterByDescription(description: string) {
    return this.http.get<Produto[]>(`http://localhost:3000/produtos?description=${description}`).toPromise();
  }

  getByid(id: number) {
    return this.http.get<Produto>(`http://localhost:8080/estoque/api/produtos/${id}`).toPromise();
  }
}