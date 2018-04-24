import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { Lancamento } from '../core/model';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';

export class LancamentoFilter {
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;

  pagina = 0;
  totalItensPorPagina = 2;
}

@Injectable()
export class LancamentoService {

  lancamentoUrl: string;

  constructor(private http: AuthHttp) { 
    this.lancamentoUrl = `${environment.apiUrl}/lancamentos`;
  }

  pesquisar(filtro: LancamentoFilter): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.totalItensPorPagina.toString());

    if(filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if(filtro.dataVencimentoDe) {
      params.set('dataVencimentoDe', moment(filtro.dataVencimentoDe).format('YYYY-MM-DD'));
    }

    if(filtro.dataVencimentoAte) {
      params.set('dataVencimentoAte', moment(filtro.dataVencimentoAte).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentoUrl}?resumo`, { search: params })
      .toPromise()
      .then(response => { 
        const responseJson =  response.json();

        const resultado = {
          lancamentos: responseJson.content,
          total: responseJson.totalElements
        }

        return resultado;
    });
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.lancamentoUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  salvar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post(this.lancamentoUrl, JSON.stringify(lancamento))
      .toPromise()
      .then(response => response.json()); 
  }

  buscarPorId(id: number): Promise<Lancamento> {
    return this.http.get(`${this.lancamentoUrl}/${id}`)
      .toPromise()
      .then(response => {
          const lancamento = response.json() as Lancamento;
         
          if(lancamento) {
            this.converterStringsParaDatas([lancamento]);
          }

          return lancamento;
      });
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put(`${this.lancamentoUrl}/${lancamento.id}`, JSON.stringify(lancamento))
    .toPromise()
    .then(response => { 
        const lancamentoAlterado = response.json() as Lancamento;

        if(lancamentoAlterado) {
          this.converterStringsParaDatas([lancamentoAlterado]);
        }

        return lancamentoAlterado;  
    });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for(const lancamento of lancamentos) {       
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if(lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }
}
