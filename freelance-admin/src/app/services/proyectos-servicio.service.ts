import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query, doc, deleteDoc, updateDoc, getDoc } from '@angular/fire/firestore';

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
        codigo: this.generarCodigoProyecto()
      };
      const docRef = await addDoc(collection(this.firestore, 'proyectos'), nuevoProyecto);
      return docRef;
    } catch (error) {
      console.error('❌ Error al crear el proyecto:', error);
      throw error;
    }
  }

  /** 🔵 Obtener todos los proyectos desde Firestore */
  async getProyectos() {
    return (
      await getDocs(query(collection(this.firestore, 'proyectos')))
    ).docs.map((proyecto) => ({
      id: proyecto.id,
      ...proyecto.data(),
    }));
  }

  /** 🟣 Obtener un solo proyecto por ID */
  async getProyectoById(id: string) {
    try {
      const proyectoRef = doc(this.firestore, 'proyectos', id);
      const proyectoSnap = await getDoc(proyectoRef);

      if (proyectoSnap.exists()) {
        return { id: proyectoSnap.id, ...proyectoSnap.data() };
      } else {
        throw new Error('El proyecto no existe');
      }
    } catch (error) {
      console.error('❌ Error al obtener el proyecto:', error);
      throw error;
    }
  }

  /** 🟠 Editar un proyecto en Firestore */
  async editarProyecto(id: string, data: any) {
    try {
      const proyectoRef = doc(this.firestore, 'proyectos', id);
      await updateDoc(proyectoRef, data);
      console.log('✅ Proyecto actualizado:', id);
    } catch (error) {
      console.error('❌ Error al actualizar el proyecto:', error);
      throw error;
    }
  }

  /** 🔴 Eliminar un proyecto en Firestore */
  async eliminarProyecto(id: string) {
    try {
      const proyectoRef = doc(this.firestore, 'proyectos', id);
      await deleteDoc(proyectoRef);
      console.log('🗑 Proyecto eliminado con ID:', id);
    } catch (error) {
      console.error('❌ Error al eliminar el proyecto:', error);
      throw error;
    }
  }
}
