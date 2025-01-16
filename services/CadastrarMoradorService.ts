// cadastrar-morador.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Morador } from 'src/app/components/model/Morador.model'; // Ajuste o caminho conforme necessário

@Injectable({
  providedIn: 'root'
})
export class CadastrarMoradorService {
  private URL: string = 'https://oasisapi.onrender.com/moradores'; // URL da sua API

  constructor(private http: HttpClient) { }

  cadastrar(morador: Morador): Observable<Morador> {
    return this.http.post<Morador>(this.URL, morador);
  }
}
