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
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './proyectos-crear.component.html',
  styleUrls: ['./proyectos-crear.component.css'],
})
export class ProyectosCrearComponent implements OnInit {
  proyectoForm: FormGroup;
  estados = ['Finalizado', 'En curso...', 'Sin comenzar'];
  tecnologias: any = [];
  imagenBase64: string | null = null; // Guardará la imagen convertida en Base64

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tecnologiasService: TecnologiasService,
    private proyectosService: ProyectosServicioService
  ) {
    this.proyectoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      estado: ['', Validators.required],
      tecnologias: [[]],
      foto: [''], // Se almacenará como Base64
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
   * Convierte la imagen seleccionada a Base64 y la almacena en `imagenBase64`
   */
  onFileSelected(event: Event) {
    // Obtener el archivo seleccionado por el usuario
    const file = (event.target as HTMLInputElement).files?.[0];
  
    // Verificar si el usuario realmente seleccionó un archivo
    if (file) {
      const reader = new FileReader(); // Crear un lector de archivos
  
      // Evento que se ejecuta cuando la lectura de la imagen finaliza
      reader.onload = () => {
        this.imagenBase64 = reader.result as string; // Guardar la imagen en Base64
      };
  
      // Iniciar la lectura del archivo en formato Base64
      reader.readAsDataURL(file); //Convierte el File a Base64 con el metodo readAsDataURL
    }
  }
  

  /**
   * Crea un nuevo proyecto con la imagen en Base64 y lo guarda en Firestore
   */
  async crearProyecto() {
    if (this.proyectoForm.valid) {
      try {
        const proyecto = {
          ...this.proyectoForm.value,
          foto: this.imagenBase64 || '', // Guardar la imagen en Base64
          tecnologias: Array.isArray(this.proyectoForm.value.tecnologias)
            ? this.proyectoForm.value.tecnologias
            : [this.proyectoForm.value.tecnologias],
        };

        // Guardar en Firestore
        const docRef = await this.proyectosService.createProyecto(proyecto);
        console.log('✅ Proyecto creado con ID:', docRef.id);

        // Redirigir al usuario
        this.router.navigate(['/']);
      } catch (error) {
        console.error('❌ Error al crear el proyecto:', error);
      }
    } else {
      console.warn('⚠ El formulario no es válido.');
    }
  }
}
