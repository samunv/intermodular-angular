import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TecnologiasService } from '../services/tecnologias.service'; // Importar servicio de tecnologías
import { ProyectosServicioService } from '../services/proyectos-servicio.service'; // Importar servicio de proyectos

@Component({
  selector: 'app-proyectos-crear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './proyectos-crear.component.html',
  styleUrls: ['./proyectos-crear.component.css'],
})
export class ProyectosCrearComponent implements OnInit {
  proyectoForm: FormGroup;
  estados = ['Finalizado', 'En curso', 'Sin comenzar'];
  tecnologias: any = []; // Aquí se almacenan las tecnologías obtenidas

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tecnologiasService: TecnologiasService, // Servicio de tecnologías
    private proyectosService: ProyectosServicioService // Servicio de proyectos
  ) {
    this.proyectoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      estado: ['', Validators.required],
      tecnologias: [[]], // Se almacenarán como array
      foto: [''],
    });
  }

  ngOnInit() {
    this.cargarTecnologias();
  }

  async cargarTecnologias() {
    try {
      this.tecnologias = await this.tecnologiasService.getTecnologias();
      console.log('Tecnologías cargadas:', this.tecnologias);
    } catch (error) {
      console.error('Error al obtener tecnologías:', error);
    }
  }

  async crearProyecto() {
    if (this.proyectoForm.valid) {
      const proyecto = {
        ...this.proyectoForm.value,
        tecnologias: Array.isArray(this.proyectoForm.value.tecnologias)
          ? this.proyectoForm.value.tecnologias
          : [this.proyectoForm.value.tecnologias],
      };

      try {
        // Llamar al servicio de proyectos para crear el proyecto
        const docRef = await this.proyectosService.createProyecto(proyecto);
        console.log('Proyecto creado con ID:', docRef.id);

        // Redirigir al usuario después de crear el proyecto
        this.router.navigate(['/']);
      } catch (error) {
        console.error('Error al crear el proyecto:', error);
      }
    } else {
      console.warn('El formulario no es válido.');
    }
  }
}
