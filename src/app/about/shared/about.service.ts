import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { About } from './about';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<About>('http://localhost:3000/about')
    .pipe(
      map((data: any) => {
        const aboutResult = new About(data)
        return aboutResult;
      })
    ).toPromise();
  }
}
