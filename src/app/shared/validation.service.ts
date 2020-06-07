import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor(private http: HttpClient) { }
  // checkMail(mail) {
  //   const url = 'http://apilayer.net/api/check?access_key=b31f6ec1e0d20f13a39676da81239f52&email=' + mail + '&smtp=1&format=1';
  //   return this.http.get(url);
  // }
}
