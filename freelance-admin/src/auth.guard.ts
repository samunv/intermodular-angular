import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { AuthService } from './app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private auth: Auth) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (usuario: User | null) => {
        if (usuario) {
          console.log(' Usuario autenticado:', usuario.email);
          localStorage.setItem('user', JSON.stringify(usuario)); // Asegurar que se guarda el usuario
          resolve(true);
        } else {
          console.warn(' No hay usuario autenticado. Redirigiendo a login...');
          localStorage.removeItem('user'); // Borrar usuario del localStorage
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }
}
