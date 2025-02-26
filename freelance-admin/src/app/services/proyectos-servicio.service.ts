import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, getDocs, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProyectosServicioService {
  constructor(private firestore: Firestore) {}
  
  async createProyecto(proyecto: any) {
    try {
      const docRef = await addDoc(collection(this.firestore, 'proyectos'), proyecto);
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
