import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proyectos-crear',
  standalone: true, // Indicar que este componente es standalone
  imports: [CommonModule, ReactiveFormsModule], // Importamos lo necesario
  templateUrl: './proyectos-crear.component.html',
  styleUrls: ['./proyectos-crear.component.css']
})
export class ProyectosCrearComponent {
  proyectoForm: FormGroup;
  estados = ['Finalizado', 'En curso', 'Sin comenzar'];

  constructor(private fb: FormBuilder, private firestore: Firestore, private router: Router) {
    this.proyectoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      estado: ['', Validators.required],
      tecnologias: [''],
      foto: [''],
      id_factura: [''],
      presupuesto: [0, Validators.required]
    });
  }

  async crearProyecto() {
    if (this.proyectoForm.valid) {
      const proyecto = {
        ...this.proyectoForm.value,
        tecnologias: this.proyectoForm.value.tecnologias.split(',').map((t: string) => t.trim()) // Convertir a array
      };

      try {
        const docRef = await addDoc(collection(this.firestore, 'proyectos'), proyecto);
        console.log('Proyecto creado con ID:', docRef.id);
        this.router.navigate(['/']); // Redirigir al inicio después de crear
      } catch (error) {
        console.error('Error al crear el proyecto:', error);
      }
    }
  }
}
