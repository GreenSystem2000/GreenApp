import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnviaFeedbackService {

  constructor(private http: HttpClient) { }

  enviarEmail(feedback): Observable<any[]> {
    return this.http.post<any>("/api", feedback)
  }
}