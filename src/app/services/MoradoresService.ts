import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Morador } from '../components/model/Morador.model';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MoradoresService {
  private URL: string = 'https://oasisapi.onrender.com/moradores';

  constructor(private http: HttpClient) {}

  buscarTodos(): Observable<Morador[]> {
    return this.http.get<Morador[]>(this.URL).pipe(
      catchError(error => {
        console.error('Erro ao buscar moradores:', error);
        return throwError(() => error);
      })
    );
  }

  getMoradorById(id: number): Observable<any> {
    return this.http.get<any>(`${this.URL}/MoradorbyId/${id}`).pipe(
      map((data) => {
        if (data && data.alojamento) {
          // Atribuindo o nome do alojamento ao morador
          data.alojamentoNome = data.alojamento.nome;
        }
        return data;
      }),
      catchError(error => {
        console.error('Erro ao buscar morador:', error);
        return throwError(() => error);
      })
    );
  }

  atualizarMorador(id: number, morador: Morador): Observable<Morador> {
    return this.http.put<Morador>(`${this.URL}/${id}`, morador).pipe(
      catchError(error => {
        console.error('Erro ao atualizar morador:', error);
        return throwError(() => error);
      })
    );
  }

}
