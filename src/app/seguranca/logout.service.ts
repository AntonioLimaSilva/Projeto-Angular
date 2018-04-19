import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

import { AuthService } from './auth.service';

@Injectable()
export class LogoutService {

  tokenRevokeUrl = 'http://localhost:8080/tokens/revoke';

  constructor(
    private http: AuthHttp,
    private authService: AuthService
  ) { }

  logout() {
    return this.http.delete(this.tokenRevokeUrl, { withCredentials: true })
    .toPromise()
    .then(() => {
      this.authService.limparAccessToken();
    });
  }

}