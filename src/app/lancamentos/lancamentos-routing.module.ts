import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LancamentosPesquisaComponent } from "./lancamentos-pesquisa/lancamentos-pesquisa.component";
import { LancamentoCadastroComponent } from "./lancamento-cadastro/lancamento-cadastro.component";
import { AuthGuard } from "../seguranca/auth.guard";

const routes: Routes = [
    { 
        path: 'lancamentos', 
        component: LancamentosPesquisaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
    },
    { 
        path: 'lancamentos/novo',
        component: LancamentoCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] } 
    },
    { 
        path: 'lancamentos/:id',
        component: LancamentoCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
    }
];
/**
 * É uma convensão do angular criar o modulo routing module dentro da pasta app, dessa forma
 * fica mais resumido o app module, é recomendado exportat o RouterModule, para ser possível
 * acessar algumas diretivas do mesmo
 */
@NgModule({
imports: [
    RouterModule.forChild(routes)
],
exports: [
    RouterModule
]
})
export class LancamentosRoutingModule {}