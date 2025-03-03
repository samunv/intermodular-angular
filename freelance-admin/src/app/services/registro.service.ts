import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(private auth: Auth) {}

  /**
   * Registra un nuevo usuario con email y contraseña en Firebase
   * @param email - Correo electrónico del usuario
   * @param password - Contraseña del usuario
   * @returns Promesa con la información del usuario registrado
   */
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
}
