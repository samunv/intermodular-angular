import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Importamos el servicio de autenticación

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent {
  constructor(private authService: AuthService) {}

  /**
   * Cierra la sesión del usuario
   */
  logout() {
    this.authService.logout();
  }
}
