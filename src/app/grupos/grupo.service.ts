import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

@Injectable()
export class GrupoService {

  gruposUrl: string;

  constructor(private http: AuthHttp) { 
    this.gruposUrl = `${environment.apiUrl}/grupos`;
  }

  pesquisar(): Promise<any> {
    return this.http.get(`${this.gruposUrl}`)
      .toPromise()
      .then(response => response.json())
  }

}
