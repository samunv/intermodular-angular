import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, getDocs, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TecnologiasService {

  constructor(private firestore: Firestore) {}

  async getTecnologias() {
      return (
        await getDocs(query(collection(this.firestore, 'tecnologias')))
      ).docs.map((tecnologia) => tecnologia.data());
    }
}
