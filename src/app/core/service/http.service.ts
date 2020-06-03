import { Injectable } from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HTTP, private storage: Storage) { }

  private async getAuthorizationHeader(headers: any) {
    const token = await this.storage.get('token');

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  async get<T>(url: string, parameters: any = {}, headers: any = {}) {
    headers = await this.getAuthorizationHeader(headers);
    const result = await this.http.get(url, parameters, headers);
    return this.readResult<T>(result);
  }

  async post<T>(url: string, body: any = {}, headers: any = {}) {
    headers = await this.getAuthorizationHeader(headers);
    const result = await this.http.post(url, body, headers);
    return this.readResult<T>(result);
  }

  async put<T>(url: string, body: any = {}, headers: any = {}) {
    headers = await this.getAuthorizationHeader(headers);
    const result = await this.http.put(url, body, headers);
    return this.readResult<T>(result);
  }

  async delete<T>(url: string, parameters: any = {}, headers: any = {}) {
    headers = await this.getAuthorizationHeader(headers);
    const result = await this.http.delete(url, parameters, headers);
    return this.readResult<T>(result);
  }

  private readResult<T>(result: HTTPResponse) {
    if (result && result.data) {
      return JSON.parse(result.data) as T;
    }

    return null;
  }
}