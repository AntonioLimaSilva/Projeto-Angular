import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Pessoa } from '../../core/model';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

import { ToastyService } from 'ng2-toasty';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private errorHandlerService:ErrorHandlerService,
    private toastyService: ToastyService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.title.setTitle('Nova pessoa');

    const idPessoa = this.route.snapshot.params['id'];

    if(idPessoa) {
      this.carregarPessoa(idPessoa);
    }
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.salvar(this.pessoa)
      .then(pessoa => {
        this.toastyService.success('Pessoa salva com sucesso!');

        this.router.navigate(['/pessoas', pessoa.id]);
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
    .then(pessoa => {
      this.pessoa = pessoa;

      this.atualizarEdicaoPessoa();

      this.toastyService.success('Pessoa atualizada com sucesso!');
    })
    .catch(error => this.errorHandlerService.handle(error));
  }

  carregarPessoa(id: number) {
    this.pessoaService.buscarPorId(id)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.atualizarEdicaoPessoa();
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/nova']);
  }

  get editando() {
    return Boolean(this.pessoa.id);
  }

  private atualizarEdicaoPessoa() {
    this.title.setTitle(`Edição da pessoa: ${this.pessoa.nome}`);
  }
}
