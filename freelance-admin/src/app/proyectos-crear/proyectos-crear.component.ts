import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

interface Tecnologia {
  id: string;
  nombre: string;
  icono: string;
}

@Component({
  selector: 'app-proyectos-crear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './proyectos-crear.component.html',
  styleUrls: ['./proyectos-crear.component.css']
})
export class ProyectosCrearComponent implements OnInit {
  proyectoForm: FormGroup;
  estados = ['Finalizado', 'En curso', 'Sin comenzar'];
  tecnologias: Tecnologia[] = []; // Se llenará desde Firebase

  constructor(private fb: FormBuilder, private firestore: Firestore, private router: Router) {
    this.proyectoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      estado: ['', Validators.required],
      tecnologias: [[]], // Se almacenarán como array
      foto: [''],
      id_factura: [''],
      presupuesto: [0, Validators.required]
    });
  }

  ngOnInit() {
    this.obtenerTecnologiasDesdeFirebase();
  }

  // Obtener tecnologías desde Firebase
  obtenerTecnologiasDesdeFirebase() {
    const tecnologiasRef = collection(this.firestore, 'tecnologias');
    collectionData(tecnologiasRef, { idField: 'id' }).subscribe((data: any) => {
      this.tecnologias = data.map((tecnologia: any) => ({
        id: tecnologia.id,
        nombre: tecnologia.nombre,
        icono: tecnologia.icono
      }));
    });
  }

  async crearProyecto() {
    if (this.proyectoForm.valid) {
      const proyecto = {
        ...this.proyectoForm.value,
        tecnologias: Array.isArray(this.proyectoForm.value.tecnologias)
          ? this.proyectoForm.value.tecnologias
          : [this.proyectoForm.value.tecnologias]
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
