import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const usuario = this.auth.currentUser || JSON.parse(localStorage.getItem('user') || 'null');
    if (usuario) {
      return true;
    } else {
      console.error(' Acceso denegado. Redirigiendo a login...');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
