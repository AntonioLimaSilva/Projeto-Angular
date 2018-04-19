import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Lancamento } from '../../core/model';
import { LancamentoService } from '../lancamento.service';

import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private errorHandlerService: ErrorHandlerService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];
  pessoas = [];

  ngOnInit() {
    const idLancamento = this.route.snapshot.params['id'];

    this.title.setTitle('Novo lançamento');

    if(idLancamento) {
      this.carregarLancamento(idLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    this.categoriaService.buscarTodas()
    .then(categorias => {
      this.categorias = categorias.map(c => ({ label: c.nome, value: c.id }));
    })
    .catch(error => this.errorHandlerService.handle(error));
  }

  carregarPessoas() {
    this.pessoaService.buscarTodas()
    .then(pessoas => {
      this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.id }));
    })
    .catch(error => this.errorHandlerService.handle(error));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.salvar(this.lancamento)
      .then(lancamentoAdicionado => { 
        this.toastyService.success('Lançamento salvo com sucesso');
        
        this.router.navigate(['/lancamentos', lancamentoAdicionado.id]);
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamento => {
      this.lancamento = lancamento
      
      this.toastyService.success('Lançamento atualizado com sucesso!');

      this.atualizarTituloEdicao();
    })
    .catch(error => this.errorHandlerService.handle(error));
  }

  carregarLancamento(id: number) {
    this.lancamentoService.buscarPorId(id)
    .then(lancamento => { 
      this.lancamento = lancamento;

      this.atualizarTituloEdicao();
    })
    .catch(error => this.errorHandlerService.handle(error));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function(){
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

  get editando() {
    return Boolean(this.lancamento.id);
  }

}
