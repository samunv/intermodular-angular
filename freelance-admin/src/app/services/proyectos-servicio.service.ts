import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  query,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  where,
  collectionData,
} from '@angular/fire/firestore';
import { Proyecto } from '../Proyecto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProyectosServicioService {
  constructor(private firestore: Firestore) {}

  private generarCodigoProyecto(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  /** Crear un nuevo proyecto en Firestore */
  async createProyecto(proyecto: any) {
    try {
      const nuevoProyecto = {
        ...proyecto,
        codigo: this.generarCodigoProyecto(),
      };
      const docRef = await addDoc(
        collection(this.firestore, 'proyectos'),
        nuevoProyecto
      );
      return docRef;
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
      throw error;
    }
  }

  /** Obtener todos los proyectos desde Firestore */
  async getProyectos() {
    return (
      await getDocs(query(collection(this.firestore, 'proyectos')))
    ).docs.map((proyecto) => ({
      id: proyecto.id,
      ...proyecto.data(),
    }));
  }

  async getProyectoById(id: string): Promise<Proyecto | null> {
    try {
      const proyectoRef = doc(this.firestore, 'proyectos', id);
      const proyectoSnap = await getDoc(proyectoRef);

      if (proyectoSnap.exists()) {
        //  Asegurar que el objeto coincide con la interfaz Proyecto
        return {
          id: proyectoSnap.id,
          ...(proyectoSnap.data() as Proyecto), //  Forzar el tipo de dato
        };
      } else {
        console.error(' El proyecto no existe.');
        return null;
      }
    } catch (error) {
      console.error(' Error al obtener el proyecto:', error);
      return null;
    }
  }

  getProyectoByCodigo(codigo: string): Observable<any[]> {
    const proyectosRef = collection(this.firestore, 'proyectos');
    const q = query(proyectosRef, where('codigo', '==', codigo));
    return collectionData(q, { idField: 'id' });
  }

  /**  Editar un proyecto en Firestore */
  async editarProyecto(id: string, data: any) {
    try {
      const proyectoRef = doc(this.firestore, 'proyectos', id);
      await updateDoc(proyectoRef, data);
      console.log('Proyecto actualizado:', id);
    } catch (error) {
      console.error('Error al actualizar el proyecto:', error);
      throw error;
    }
  }

  /**  Eliminar un proyecto en Firestore */
  async eliminarProyecto(id: string) {
    try {
      const proyectoRef = doc(this.firestore, 'proyectos', id);
      await deleteDoc(proyectoRef);
      console.log('Proyecto eliminado con ID:', id);
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
      throw error;
    }
  }

  async actualizarPresupuesto(codigo: string, totalPresupuesto: number) {
    try {
      const proyectosRef = collection(this.firestore, 'proyectos');
      const q = query(proyectosRef, where('codigo', '==', codigo));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error(`Proyecto con código ${codigo} no encontrado.`);
      }

      const proyectoDoc = querySnapshot.docs[0];
      const proyectoRef = doc(this.firestore, 'proyectos', proyectoDoc.id);

      await updateDoc(proyectoRef, {
        presupuesto: totalPresupuesto,
      });

      console.log(
        `Presupuesto actualizado a ${totalPresupuesto} para el proyecto con código: ${codigo}`
      );
    } catch (error) {
      console.error('Error al actualizar el presupuesto:', error);
      throw error;
    }
  }
}
