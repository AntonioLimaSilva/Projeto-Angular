import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Usuario } from '../../core/model';
import { GrupoService } from '../../grupos/grupo.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  usuario = new Usuario();
  grupos: any[] = [];
  grupo: any;

  constructor(
    private grupoService: GrupoService,
    private errorHandlerService: ErrorHandlerService,
    private usuarioService: UsuarioService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.grupoService.pesquisar()
      .then(grupos => this.grupos = grupos)
      .catch(error => this.errorHandlerService.handle(error))
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.usuario = new Usuario();
    }.bind(this), 1);

    this.router.navigate(['/usuarios/novo']);
  }

  salvar(form: FormControl) {
    this.usuario.grupos.push(this.grupo)
    this.usuarioService.salvar(this.usuario)
    .then(usuario => console.log(usuario))
    .catch(error => this.errorHandlerService.handle(error))
  }

  setGrupo(grupo: any) {
    this.grupo = grupo;
  }

  get editando() {
    return Boolean(this.usuario.id);
  }

}
