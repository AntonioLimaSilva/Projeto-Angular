import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ConfirmationService } from 'primeng/components/common/api';

import { ToastyService } from 'ng2-toasty';

import { PessoaService, PessoaFilter } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFilter();
  pessoas = [];

  @ViewChild('tabela') grid;
  
  constructor(
    private pessoaService: PessoaService,
    private errorHandlerService: ErrorHandlerService,
    private confirmationService: ConfirmationService,
    private toastyService: ToastyService,
    private title: Title
  ) {}
  
  ngOnInit() {
    this.title.setTitle('Pesquisa de pessoas');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(response => {
        this.pessoas = response.pessoas;
        this.totalRegistros = response.totalRegistros;
      });
  }

  aoMudarPagina(evento: LazyLoadEvent) {
    const pagina = evento.first / evento.rows;

    this.pesquisar(pagina);
  }

  confirmacaoExclusao(pessoa: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.id)
    .then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
      }

      this.toastyService.success(pessoa.nome + ' excluído com sucesso!');

    }).catch(error => this.errorHandlerService.handle(error));
  }

  alterarAtivo(pessoa: any) {
    const novoStatus = !pessoa.ativo;
    this.pessoaService.alterarAtivo(pessoa.id, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'Ativa' : 'Inativa';

      pessoa.ativo = novoStatus;
      this.toastyService.success(`Pessoa ${acao} com sucesso!`);
    })
    .catch(error => this.errorHandlerService.handle(error));
  }
}
