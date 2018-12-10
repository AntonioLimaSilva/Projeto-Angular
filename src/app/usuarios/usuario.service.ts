import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { Usuario } from '../core/model';

@Injectable()
export class UsuarioService {

  usuariosUrl: string;

  constructor(private http: AuthHttp) {
    this.usuariosUrl = `${environment.apiUrl}/usuarios`;
   }

   salvar(usuario: Usuario): Promise<Usuario> {
    return this.http.post(this.usuariosUrl, JSON.stringify(usuario))
      .toPromise()
      .then(response => response.json());
  }
}
