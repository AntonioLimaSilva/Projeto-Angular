import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ConfirmationService } from 'primeng/components/common/api';

import { ToastyService } from 'ng2-toasty';

import { LancamentoFilter } from '../lancamento.service';
import { LancamentoService } from '../lancamento.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  filtro = new LancamentoFilter();
  lancamentos = [];
  totalRegistros = 0;

  @ViewChild('tabela') grid;

  constructor(
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de lançamentos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
    .then(response => { 
      this.lancamentos = response.lancamentos,
      this.totalRegistros = response.total
    }).catch(erro => this.errorHandlerService.handle(erro));
  }

  aoMudarPagina(evento: LazyLoadEvent) {
    const pagina = evento.first / evento.rows;
    this.pesquisar(pagina);
  }

  confirmacaoExclusao(lancamento: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.id)
    .then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0
      }

      this.toastyService.success('Lançamento excluído com sucesso!');

    }).catch(erro => this.errorHandlerService.handle(erro));
  }
}
