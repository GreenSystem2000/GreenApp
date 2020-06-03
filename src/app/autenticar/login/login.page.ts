import { ToastService } from './../../core/service/toast.service';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Login } from '../compartilhado/login';
import { AutenticadoService } from '../compartilhado/autenticado.service';

@Component({
  selector   : 'app-login',
  templateUrl: './login.page.html',
  styleUrls  : ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginModel: Login = new Login();

  constructor(private authService: AutenticadoService, private router: Router, private toast: ToastService) { }

  ngOnInit() {
  }

  async onSubmit(username) {
    try {
      await this.authService.login(this.loginModel);
      this.router.navigate(['tabs/produtos']);
      localStorage.setItem('username', username.valueAccessor.lastValue)
    } catch (error) {
      this.toast.showError('Ocorreu algum erro ao tentar fazer o login');
    }
  }
}