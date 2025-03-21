import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  addDoc,
} from '@angular/fire/firestore';
import { Factura } from '../Factura';

import { deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FacturaServicioService {
  constructor(private firestore: Firestore) {}

  // Obtener facturas por código de proyecto
  async getFacturas(codigoProyecto: string): Promise<Factura[]> {
    try {
      const facturasQuery = query(
        collection(this.firestore, 'facturas'),
        where('codigoProyecto', '==', codigoProyecto)
      );

      const snapshot = await getDocs(facturasQuery);
      return snapshot.docs.map((factura) => factura.data() as Factura);
    } catch (error) {
      console.error('Error al obtener las facturas:', error);
      throw error;
    }
  }

  // Obtener una factura por su número
  async getFacturaByNumero(numero: string): Promise<Factura | null> {
    try {
      const facturasQuery = query(
        collection(this.firestore, 'facturas'),
        where('numeroFactura', '==', numero)
      );

      const snapshot = await getDocs(facturasQuery);

      if (!snapshot.empty) {
        // Solo tomamos la primera coincidencia
        return snapshot.docs[0].data() as Factura;
      } else {
        console.warn('No se encontró ninguna factura con ese número');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener la factura por número:', error);
      throw error;
    }
  }

  async eliminarFacturasPorCodigoProyecto(codigoProyecto: string): Promise<void> {
    try {
      const facturasQuery = query(
        collection(this.firestore, 'facturas'),
        where('codigoProyecto', '==', codigoProyecto)
      );
  
      const snapshot = await getDocs(facturasQuery);
  
      if (!snapshot.empty) {
        const deletePromises = snapshot.docs.map(async (facturaDoc) => {
          await deleteDoc(facturaDoc.ref);
          console.log(`Factura eliminada: ${facturaDoc.id}`);
        });
  
        await Promise.all(deletePromises); // Esperamos que todas se eliminen
      } else {
        console.warn('No se encontró ninguna factura con ese código de proyecto');
      }
    } catch (error) {
      console.error('Error al eliminar las facturas:', error);
      throw error;
    }
  }
  
}
