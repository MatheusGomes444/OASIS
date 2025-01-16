import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoradorService {

  private apiUrl = ' https://oasisapi.onrender.com/';

  constructor(private http: HttpClient) { }

  cadastrarMorador(morador: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };

    return this.http.post(`${this.apiUrl}/moradores`, morador, options);
  }
  getMoradorById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/MoradorbyId${id}`);
  }
  getMoradores(alojamentoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${alojamentoId}/moradores`);
  }
  atualizarMorador(id: number, morador: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, morador);
  }
  // Você pode adicionar outros métodos para obter, atualizar e deletar moradores...
}
