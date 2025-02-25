import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from './Proyecto';
import { Observable } from 'rxjs';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  getDocs,
  query,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProyectosServicioService {
  constructor(public firestore: Firestore) {}

  // Función para subir un proyecto
  async createProyecto(nombre: string, descripcion: string) {
    const docRef = await addDoc(collection(this.firestore, 'proyectos'), {
      nombre: nombre,
      descripcion: descripcion,
    });
    console.log('Document written with ID: ', docRef.id);
  }

  async getProyectos() {
    return (
      await getDocs(query(collection(this.firestore, 'proyectos')))
    ).docs.map((proyecto) => proyecto.data());
  }
}
