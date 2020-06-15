import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http: HttpClient) { }

  get(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/estoque/api/cart")
  }

  post(infoComprador: any): Observable<any[]> {
    // return this.http.post<any[]>("http://localhost:3000/cart", infoComprador)
    return this.http.post<any[]>("http://localhost:8080/estoque/api/cart/salvarapi", infoComprador)
  }
}