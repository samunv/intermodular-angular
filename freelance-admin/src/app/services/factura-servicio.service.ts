import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, where, addDoc } from '@angular/fire/firestore';
import { Factura } from '../Factura';

@Injectable({
  providedIn: 'root',
})
export class FacturaServicioService {
  constructor(private firestore: Firestore) {}

  // Obtener facturas por código de proyecto
  async getFacturas(codigoProyecto: string): Promise<Factura[]> { // Devuelve uan promesa de un array de facturas
    try {
      const facturasQuery = query(
        collection(this.firestore, 'facturas'),
        where('codigoProyecto', '==', codigoProyecto)  // Filtra las facturas que tienen el mismo código de proyecto
      );

      const snapshot = await getDocs(facturasQuery);   // Ejecuta la consulta y espera la respuesta de Firebase
      return snapshot.docs.map((factura) => factura.data() as Factura);
    } catch (error) {
      console.error('❌ Error al obtener las facturas:', error);
      throw error;
    }
  }

 
}
