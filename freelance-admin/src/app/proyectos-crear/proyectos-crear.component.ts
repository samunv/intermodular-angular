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
import { TecnologiasService } from '../services/tecnologias.service';
import { ProyectosServicioService } from '../services/proyectos-servicio.service';

@Component({
  selector: 'app-proyectos-crear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './proyectos-crear.component.html',
  styleUrls: ['./proyectos-crear.component.css'],
})
export class ProyectosCrearComponent implements OnInit {
  proyectoForm: FormGroup;
  estados = ['Finalizado', 'En curso...', 'Sin comenzar'];
  tecnologias: any = [];
  imagenBase64: string | null = null;
  errorImagen: string = ''; // Para manejar errores de imagen

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tecnologiasService: TecnologiasService,
    private proyectosService: ProyectosServicioService
  ) {
    this.proyectoForm = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      descripcion: ['', [Validators.required, Validators.maxLength(300)]],
      estado: ['', Validators.required],
      tecnologias: [[], Validators.required],
      foto: ['', Validators.required], // La imagen ahora es obligatoria
    });
  }

  ngOnInit() {
    this.cargarTecnologias();
  }

  async cargarTecnologias() {
    try {
      this.tecnologias = await this.tecnologiasService.getTecnologias();
    } catch (error) {
      console.error('Error al obtener tecnologías:', error);
    }
  }

  /**
   * Verifica si un campo es inválido y ha sido tocado.
   */
  campoInvalido(campo: string): boolean {
    const control = this.proyectoForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }

  /**
   * Convierte la imagen seleccionada a Base64 y valida el tipo de archivo.
   */
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      // Validar tipo de imagen
      const validExtensions = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!validExtensions.includes(file.type)) {
        this.errorImagen = 'Solo se permiten imágenes PNG, JPG o JPEG';
        this.proyectoForm.get('foto')?.setErrors({ invalidType: true });
        return;
      } else {
        this.errorImagen = ''; // Limpiar mensaje de error
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imagenBase64 = reader.result as string;
        this.proyectoForm.patchValue({ foto: this.imagenBase64 });
        this.proyectoForm.get('foto')?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Crea un nuevo proyecto validando el formulario antes de enviarlo.
   */
  async crearProyecto() {
    if (this.proyectoForm.valid) {
      try {
        const proyecto = {
          ...this.proyectoForm.value,
          foto: this.imagenBase64 || '',
          tecnologias: Array.isArray(this.proyectoForm.value.tecnologias)
            ? this.proyectoForm.value.tecnologias
            : [this.proyectoForm.value.tecnologias],
        };

        const docRef = await this.proyectosService.createProyecto(proyecto);
        console.log('Proyecto creado con ID:', docRef.id);
        this.router.navigate(['/proyectos']);
      } catch (error) {
        console.error('Error al crear el proyecto:', error);
      }
    } else {
      console.warn('El formulario no es válido.');
      this.proyectoForm.markAllAsTouched(); // Marca todos los campos para que aparezcan errores
    }
  }
}
