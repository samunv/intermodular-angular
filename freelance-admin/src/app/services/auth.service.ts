import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User, onAuthStateChanged, setPersistence, browserLocalPersistence } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuarioActual: User | null = null; //  Guardará el usuario autenticado

  constructor(private auth: Auth, private router: Router) {
    this.verificarSesion(); //  Verifica si hay sesión activa al iniciar la app
  }

  /**
   *  Configura Firebase para que la sesión se mantenga
   */
  async setPersistenceSession() {
    try {
      await setPersistence(this.auth, browserLocalPersistence);
      console.log(' Persistencia de sesión activada.');
    } catch (error) {
      console.error(' Error configurando persistencia:', error);
    }
  }

  /**
   *  Inicia sesión en Firebase y guarda la sesión
   */
  async login(email: string, password: string): Promise<void> {
    try {
      await this.setPersistenceSession(); //  Activa la persistencia de sesión
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.usuarioActual = userCredential.user;
      localStorage.setItem('user', JSON.stringify(this.usuarioActual)); //  Guardar usuario en localStorage
      console.log(' Usuario autenticado:', this.usuarioActual);
      this.router.navigate(['/proyectos']); //  Redirigir a la página principal
    } catch (error) {
      console.error(' Error al iniciar sesión:', error);
      throw error;
    }
  }

  /**
   *  Verifica si hay un usuario autenticado, incluso después de recargar la página
   */
  verificarSesion() {
    onAuthStateChanged(this.auth, (usuario) => {
      if (usuario) {
        this.usuarioActual = usuario;
        localStorage.setItem('user', JSON.stringify(usuario)); //  Guardar usuario en almacenamiento local
        console.log(' Sesión iniciada automáticamente:', usuario);
      } else {
        this.usuarioActual = null;
        localStorage.removeItem('user'); //  Eliminar usuario si no hay sesión
        console.log(' No hay sesión activa.');
      }
    });
  }

  /**
   *  Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.auth.currentUser || !!localStorage.getItem('user'); //  Ahora también verifica localStorage
  }

  /**
   *  Cierra sesión del usuario en Firebase
   */
  async logout(): Promise<void> {
    await signOut(this.auth);
    this.usuarioActual = null;
    localStorage.removeItem('user'); //  Eliminar usuario del almacenamiento
    console.log(' Sesión cerrada.');
    this.router.navigate(['/login']); //  Redirigir al login después del logout
  }
  /**
 *  Obtiene la información del usuario autenticado
 */
getUsuarioActual(): User | null {
  return this.auth.currentUser || JSON.parse(localStorage.getItem('user') || 'null');
}

}
