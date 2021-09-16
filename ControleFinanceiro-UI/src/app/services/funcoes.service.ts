import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcao } from '../models/Funcao';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class FuncoesService {
  url = 'api/Funcoes';

  constructor(private http: HttpClient) {}

  PegarTodos(): Observable<Funcao[]> {
    return this.http.get<Funcao[]>(this.url);
  }

  PegarPeloId(funcaoId: string): Observable<Funcao> {
    const apiUrl = `${this.url}/${funcaoId}`;
    return this.http.get<Funcao>(apiUrl);
  }

  NovaFuncao(funcao: Funcao): Observable<any> {
    return this.http.post<Funcao>(this.url, funcao, httpOptions);
  }

  AtualizarFuncao(funcaoId: string, funcao: Funcao): Observable<any> {
    const apiUrl = `${this.url}/${funcaoId}`;
    return this.http.put<Funcao>(apiUrl, funcao, httpOptions);
  }

  ExcluirFuncao(funcaoId: string): Observable<any>{
    const apiUrl = `${this.url}/${funcaoId}`;
    return this.http.delete<string>(apiUrl, httpOptions);
  }
}
