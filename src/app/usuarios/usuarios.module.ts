import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TooltipModule, ButtonModule, InputTextModule, RadioButtonModule, PasswordModule } from 'primeng/primeng';

import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule, 
    RouterModule,
    UsuariosRoutingModule,
    SharedModule,
    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    PasswordModule
  ],
  declarations: [
    UsuarioCadastroComponent
  ]
})
export class UsuariosModule { }
