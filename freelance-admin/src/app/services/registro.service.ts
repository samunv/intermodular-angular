import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, query, where, getDocs, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  /**
   * Verifica si el usuario ya está registrado en Firestore
   */
  async userExists(email: string): Promise<boolean> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty; // Retorna `true` si el usuario ya existe
  }

  /**
   * Registra un usuario en Firebase Authentication y lo almacena en Firestore
   */
  async register(email: string, password: string) {
    // Verificar si el usuario ya existe en Firestore
    if (await this.userExists(email)) {
      throw new Error('El correo ya está registrado. Intenta con otro.');
    }

    // Crear usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    
    // Guardar datos del usuario en Firestore
    const userData = {
      uid: userCredential.user.uid,
      email: email,
      createdAt: new Date().toISOString()
    };

    await addDoc(collection(this.firestore, 'users'), userData);
    return userCredential;
  }
}
