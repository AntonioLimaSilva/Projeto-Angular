import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { SharedModule } from '../shared/shared.module';
import { LancamentosRoutingModule } from './lancamentos-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,

    SelectButtonModule,
    CalendarModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    TooltipModule,
    ButtonModule,
    DataTableModule,
    CurrencyMaskModule,

    SharedModule,
    LancamentosRoutingModule
  ],
  declarations: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
  ],
  exports: []
})
export class LancamentosModule { }
