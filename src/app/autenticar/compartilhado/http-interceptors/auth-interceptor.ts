import { AutenticadoService } from './../autenticado.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AutenticadoService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {        
        return this.auth.getAuthorizationToken()
            .pipe(
                mergeMap((token: any) => {                    
                    if (token) {                        
                        // O request é imutavel, ou seja, não é possível mudar nada
                        // Faço o clone para conseguir mudar as propriedades
                        // Passo o token de autenticação no header
                        const authReq = req.clone({
                            headers: req.headers.set('Authorization', `Bearer ${token}`)
                        });

                        // envio o request clonado
                        return next.handle(authReq);
                    }

                    // caso não tenha token, envio o request padrão
                    return next.handle(req);
                })
            );
    }
}