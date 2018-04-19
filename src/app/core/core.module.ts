import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyModule } from 'ng2-toasty';
import { JwtHelper } from 'angular2-jwt';

import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';

import { NavbarComponent } from './navbar/navbar.component';
import { PessoaService } from '../pessoas/pessoa.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { ErrorHandlerService } from './error-handler.service';
import { CategoriaService } from '../categorias/categoria.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { AuthService } from '../seguranca/auth.service';

registerLocaleData(localePt);

/**
 * É uma convensão do angular criar o modulo core, dessa forma é possivel importar alguns
 * modulos e exporta outros modulos e gera os providers para a aplicação ser possível
 * injetar alguns componentes
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule
  ],
  declarations: [ 
    NavbarComponent, 
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [ 
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule 
  ],
  providers: [
    PessoaService,
    LancamentoService,
    ErrorHandlerService,
    CategoriaService,
    AuthService,
    Title,
    JwtHelper,

    ConfirmationService, 
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
