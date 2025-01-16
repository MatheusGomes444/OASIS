// moradores.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Morador } from 'src/app/components/model/Morador.model'; // Certifique-se de que você tem um modelo para Morador

@Injectable({
  providedIn: 'root'
})
export class MoradoresService {
  private URL: string = 'https://oasisapi.onrender.com/moradores';

  constructor(private http: HttpClient) { }

  buscarTodos(): Observable<Morador[]> {
    return this.http.get<Morador[]>(this.URL).pipe(
      catchError(erro => {
        console.error('Erro ao buscar moradores', erro);
        return [];
      })
    );
  }
}