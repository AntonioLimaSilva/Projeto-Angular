import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  // Auth service é injetado aqui para exibir o nome do usuário logado
  constructor(private authService: AuthService) {}

}
