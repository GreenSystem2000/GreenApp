import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-login-bloqueado',
  templateUrl: './login-bloqueado.component.html',
  styleUrls: ['./login-bloqueado.component.scss'],
})
export class LoginBloqueadoComponent implements OnInit {
  @Input()
  title: string = '';

  @Input()
  message: string = '';

  constructor() { }

  ngOnInit() {}

}
