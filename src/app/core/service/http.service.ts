import { Injectable } from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HTTP, private storage: Storage ) { }


   async get<T>(url: string, parameters: any = {}, headers: any = {}) {
    const result = await this.http.get(url, parameters, headers);
    return this.readResult<T>(result);
  }

  private readResult<T>(result: HTTPResponse) {
    if (result && result.data) {
      return JSON.parse(result.data) as T;
    }

    return null;
  }
}