import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AuthHttp } from 'angular2-jwt';

import { Pessoa } from '../core/model';

export class PessoaFilter {
  nome: string;
  pagina = 0;
  totalItensPorPagina = 2;
}

@Injectable()
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: AuthHttp) { }

  pesquisar(filtro: PessoaFilter): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.totalItensPorPagina.toString());

    if(filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { search: params })
    .toPromise()
    .then(response => {
      
      const responseJson = response.json();

      const resultado = {
        pessoas : responseJson.content,
        totalRegistros: responseJson.totalElements
      }
    
      return resultado;
    });
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${id}`)
    .toPromise()
    .then(() => null);
  }

  alterarAtivo(id: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.pessoasUrl}/${id}/ativo`, ativo)
    .toPromise()
    .then(() => null);
  }

  buscarTodas(): Promise<any> {
    return this.http.get(`${this.pessoasUrl}`)
    .toPromise()
    .then(response => response.json().content);
  }

  salvar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put(`${this.pessoasUrl}/${pessoa.id}`, JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json());
  }

  buscarPorId(id: number): Promise<Pessoa> {
    return this.http.get(`${this.pessoasUrl}/${id}`)
      .toPromise()
      .then(response => response.json());
  }
}
