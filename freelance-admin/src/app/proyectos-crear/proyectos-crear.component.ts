import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TecnologiasService } from '../services/tecnologias.service';
import { ProyectosServicioService } from '../services/proyectos-servicio.service';

@Component({
  selector: 'app-proyectos-crear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,RouterLink],
  templateUrl: './proyectos-crear.component.html',
  styleUrls: ['./proyectos-crear.component.css'],
})
export class ProyectosCrearComponent implements OnInit {
  proyectoForm: FormGroup;
  estados = ['Finalizado', 'En Curso', 'Sin Comenzar'];
  tecnologias: any = [];
  imagenBase64: string | null = null;
  errorImagen: string = ''; // Para manejar errores de imagen
  presupuesto: number = 0;

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
      autor: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      direccionAutor: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      cifAutor: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(9)],
      ],
      cliente: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      direccionCliente: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      cifCliente: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(9)],
      ],
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

  onCheckboxChange(event: any): void {
    const control = this.proyectoForm.get('tecnologias');
    if (!control) {
      return;
    }
  
    // Obtenemos el array actual de tecnologías seleccionadas
    let selectedTecnologias = control.value || [];
  
    if (event.target.checked) {
      // Añadimos el valor si se selecciona
      selectedTecnologias.push(event.target.value);
    } else {
      // Eliminamos el valor si se deselecciona
      selectedTecnologias = selectedTecnologias.filter(
        (t: string) => t !== event.target.value
      );
    }
  
    // Actualizamos el formControl con el nuevo array
    control.setValue(selectedTecnologias);
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
          presupuesto: this.presupuesto,
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
