import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from './Proyecto';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProyectosServicioService {
	JSONprueba = '/data/prueba.json';
	
	constructor(private http: HttpClient) {}

	obtenerTodos(): Observable<Proyecto[]> {
		return this.http.get<Proyecto[]>(this.JSONprueba);
	}
}
