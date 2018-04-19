import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PaginaNaoEncontradaComponent } from "./core/pagina-nao-encontrada.component";

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
    { path: '**', redirectTo: 'pagina-nao-encontrada' }
];
/**
 * É uma convensão do angular criar o modulo routing module dentro da pasta app, dessa forma
 * fica mais resumido o app module, é recomendado exportat o RouterModule, para ser possível
 * acessar algumas diretivas do mesmo
 */
@NgModule({
imports: [
    RouterModule.forRoot(routes),
],
exports: [
    RouterModule
]
})
export class AppRoutingModule {}