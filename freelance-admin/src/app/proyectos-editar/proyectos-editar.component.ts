import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProyectosServicioService } from '../services/proyectos-servicio.service';
import { TecnologiasService } from '../services/tecnologias.service';

@Component({
  selector: 'app-proyectos-editar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './proyectos-editar.component.html',
  styleUrls: ['./proyectos-editar.component.css'],
})
export class ProyectosEditarComponent implements OnInit {
  proyectoForm: FormGroup;
  idProyecto: string = ''; 
  estados = ['Finalizado', 'En curso', 'Sin comenzar'];
  tecnologiasDisponibles: any[] = []; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private servicioProyectos: ProyectosServicioService,
    private servicioTecnologias: TecnologiasService
  ) {
    //  Inicializar el formulario con validaciones
    this.proyectoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(300)]],
      estado: ['', Validators.required],
      tecnologias: [[], Validators.required], 
      foto: [''],
      presupuesto: [0],
      codigo: ['']
    });
  }

  ngOnInit() {
    this.idProyecto = this.route.snapshot.paramMap.get('id') || '';
    if (this.idProyecto) {
      this.getProyecto();
    }
    this.getTecnologiasDisponibles();
  }

  /**
   *  Obtiene el proyecto desde Firestore con `Promise`
   */
  async getProyecto() {
    try {
      const proyecto = await this.servicioProyectos.getProyectoById(this.idProyecto);
      
      if (proyecto) {
        this.proyectoForm.patchValue({
          nombre: proyecto.nombre || '',
          descripcion: proyecto.descripcion || '',
          estado: proyecto.estado || '',
          tecnologias: proyecto.tecnologias || [],
          foto: proyecto.foto || '',
          presupuesto: proyecto.presupuesto || 0,
          codigo: proyecto.codigo || ''
        });
      } else {
        console.error(' Proyecto no encontrado.');
      }
    } catch (error) {
      console.error(' Error al obtener el proyecto:', error);
    }
  }

  /**
   *  Obtiene las tecnologías disponibles
   */
  async getTecnologiasDisponibles() {
    try {
      this.tecnologiasDisponibles = await this.servicioTecnologias.getTecnologias();
    } catch (error) {
      console.error(' Error al obtener las tecnologías:', error);
    }
  }

  /**
   *  Verifica si un campo es inválido y ha sido tocado
   */
  campoInvalido(campo: string): boolean {
    const control = this.proyectoForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }

  /**
   *  Maneja la selección/deselección de tecnologías
   */
  toggleTecnologia(tecnologia: string) {
    const tecnologiasSeleccionadas = this.proyectoForm.value.tecnologias || [];
    const index = tecnologiasSeleccionadas.indexOf(tecnologia);
    if (index === -1) {
      tecnologiasSeleccionadas.push(tecnologia);
    } else {
      tecnologiasSeleccionadas.splice(index, 1);
    }
    this.proyectoForm.patchValue({ tecnologias: tecnologiasSeleccionadas });
    this.proyectoForm.get('tecnologias')?.updateValueAndValidity(); // Forzar validación
  }

  /**
   *  Actualiza el proyecto en Firestore
   */
  async actualizarProyecto() {
    if (this.proyectoForm.valid) {
      try {
        await this.servicioProyectos.editarProyecto(this.idProyecto, this.proyectoForm.value);
        alert(' Proyecto actualizado con éxito');
        this.router.navigate(['/proyectos']);
      } catch (error) {
        console.error(' Error al actualizar el proyecto:', error);
      }
    } else {
      console.warn(' El formulario no es válido.');
      this.proyectoForm.markAllAsTouched(); 
    }
  }

  /**
   *  Cancela la edición y vuelve a la lista de proyectos
   */
  cancelarEdicion() {
    this.router.navigate(['/proyectos']);
  }
}
