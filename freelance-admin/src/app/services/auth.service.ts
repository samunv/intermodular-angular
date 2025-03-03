import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User, onAuthStateChanged, setPersistence, browserLocalPersistence } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuarioActual: User | null = null; //Guarda el usuario autenticado

  constructor(private auth: Auth, private router: Router) {
    this.verificarSesion(); // Verificar sesión al iniciar la app
  }

  /**
   *  Activa la persistencia de sesión en Firebase
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
   *  Inicia sesión y guarda la sesión en localStorage
   */
  async login(email: string, password: string): Promise<void> {
    try {
      await this.setPersistenceSession(); //Activa persistencia antes de login
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.usuarioActual = userCredential.user;
      localStorage.setItem('user', JSON.stringify(this.usuarioActual)); //Guarda en localStorage
      console.log('Usuario autenticado:', this.usuarioActual);
      this.router.navigate(['/proyectos']); //Redirigir tras login
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }

  /**
   * Verifica la sesión en Firebase y localStorage
   */
  verificarSesion() {
    onAuthStateChanged(this.auth, (usuario) => {
      if (usuario) {
        this.usuarioActual = usuario;
        localStorage.setItem('user', JSON.stringify(usuario)); //Guardar usuario en almacenamiento local
        console.log('Sesión iniciada automáticamente:', usuario);
        this.router.navigate(['/proyectos']); //Redirigir automáticamente si está autenticado
      } else {
        this.usuarioActual = null;
        localStorage.removeItem('user'); // Eliminar usuario si no hay sesión
        console.log('No hay sesión activa.');
      }
    });
  }
  
  /**
   *  Verifica si hay un usuario autenticado
   */
  isAuthenticated(): boolean {
    const usuarioGuardado = localStorage.getItem('user');
    return !!this.auth.currentUser || !!usuarioGuardado; // Verificar sesión en Firebase y LocalStorage
  }
  

  /**
   *  Cierra sesión y limpia el almacenamiento
   */
  async logout(): Promise<void> {
    await signOut(this.auth);
    this.usuarioActual = null;
    localStorage.removeItem('user'); //  Eliminar usuario del almacenamiento
    console.log(' Sesión cerrada.');
    this.router.navigate(['/login']); //  Redirigir tras logout
  }

  /** 
   *  Obtiene el usuario autenticado, incluso tras recargar
   */
  getUsuarioActual(): User | null {
    return this.auth.currentUser || JSON.parse(localStorage.getItem('user') || 'null');
  }
}
