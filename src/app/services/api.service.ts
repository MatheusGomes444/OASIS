import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://oasisapi.onrender.com/'; // URL da sua API em C#

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.apiUrl + '/data');
  }

  postData(data: any) {
    return this.http.post(this.apiUrl + '/data', data);
  }

}
