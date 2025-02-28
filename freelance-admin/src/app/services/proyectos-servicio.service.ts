import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProyectosServicioService {
  constructor(private firestore: Firestore) {}

  private generarCodigoProyecto(): string {
    return Math.random().toString(36).substr(2, 9); // Genera un código aleatorio
  }

  async createProyecto(proyecto: any) {
    try {
      const nuevoProyecto = {
        ...proyecto,
        codigo: this.generarCodigoProyecto() // Agregar código único automáticamente
      };
      const docRef = await addDoc(collection(this.firestore, 'proyectos'), nuevoProyecto);
      console.log('✅ Proyecto creado con ID:', docRef.id);
      return docRef;
    } catch (error) {
      console.error('❌ Error al crear el proyecto:', error);
      throw error;
    }
  }

  async getProyectos() {
    return (
      await getDocs(query(collection(this.firestore, 'proyectos')))
    ).docs.map((proyecto) => proyecto.data());
  }
}
