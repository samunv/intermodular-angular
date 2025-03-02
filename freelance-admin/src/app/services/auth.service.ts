import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  /**
   * Inicia sesión en Firebase usando email y password
   */
  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('✅ Usuario autenticado:', userCredential.user);
      this.router.navigate(['/proyectos']); // Redirigir a la página principal después del login
    } catch (error) {
      console.error('❌ Error al iniciar sesión:', error);
      throw error;
    }
  }

  /**
   * Verifica si hay un usuario autenticado
   */
  isAuthenticated(): boolean {
    return !!this.auth.currentUser;
  }

  /**
   * Cierra sesión del usuario en Firebase
   */
  async logout(): Promise<void> {
    await signOut(this.auth);
    this.router.navigate(['/login']); // Redirigir al login después del logout
  }
}
