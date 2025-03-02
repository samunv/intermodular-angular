import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  /**
   * Verifica si el usuario está autenticado antes de acceder a una ruta
   */
  canActivate(): boolean {
    if (this.auth.currentUser) {
      return true; // ✅ Permitir acceso
    } else {
      this.router.navigate(['/login']); // ❌ Redirigir si no está autenticado
      return false;
    }
  }
}
