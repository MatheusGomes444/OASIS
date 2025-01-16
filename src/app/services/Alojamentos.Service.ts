  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root',
  })
  export class AlojamentoService {
    private apiUrl = 'https://oasisapi.onrender.com/alojamentos'; // Substitua pela URL da sua API

    constructor(private http: HttpClient) {}

    listarAlojamentos(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }

    getAlojamentos(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }
    getAlojamentoById(id: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/${id}`);
    }

    getMoradores(alojamentoId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/${alojamentoId}/filtro`);
    }
    atualizarAlojamento(id: number, updatedInfo: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/Atualizar?id=${id}`, updatedInfo);
    }
    mudarMoradorDeAlojamento(moradorId: number, novoAlojamentoId: number): Observable<any> {
      const body = {
        moradorId: moradorId,
        novoAlojamentoId: novoAlojamentoId
      };

      return this.http.post(
        `https://oasisapi.onrender.com/alojamentos/${novoAlojamentoId}/mudarmorador`,
        body
      );
  }
}
