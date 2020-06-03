import { Login } from './login';
import { Conta } from './conta';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoService {

  constructor(private http: HttpClient, private storage: Storage) { }

  CriarConta(conta: Conta) {
    return this.http.post('http://localhost:8080/estoque/api/usuarios/salvarapi', conta).toPromise();
  }

  
  login(login: Login) {
    return this.http.post('http://localhost:8080/estoque/api/usuarios/login', login)
      .pipe(
        map((resp: any) => {
          const token = resp.token;
          localStorage.setItem('token', token);
        })
      ).toPromise();
  }

  
  getAuthorizationToken() {
    return from(this.storage.get('token'));
  }

  isUserAuthenticated() {
    const token =  localStorage.getItem('token');
    return token !== null;
  }

  getMinhaconta(username: string) {
    return this.http.get<Login>(`http://localhost:8080/estoque/api/usuarios/${username}`)
  }
}