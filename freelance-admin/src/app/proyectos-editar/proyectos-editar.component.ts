import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProyectosServicioService } from '../services/proyectos-servicio.service';
import { TecnologiasService } from '../services/tecnologias.service';

@Component({
  selector: 'app-proyectos-editar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proyectos-editar.component.html',
  styleUrl: './proyectos-editar.component.css',
})
export class ProyectosEditarComponent implements OnInit {
  idProyecto: string = ''; // ID del proyecto obtenido de la URL
  proyecto: any = { nombre: '', descripcion: '', estado: '', tecnologias: [] }; // Datos del proyecto
  tecnologiasDisponibles: any[] = []; // Lista de tecnologías disponibles

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioProyectos: ProyectosServicioService,
    private servicioTecnologias: TecnologiasService
  ) {}

  ngOnInit() {
    // Obtener el ID del proyecto desde la URL
    this.idProyecto = this.route.snapshot.paramMap.get('id') || '';
    if (this.idProyecto) {
      this.getProyecto();
    }
    this.getTecnologiasDisponibles();
  }

  async getProyecto() {
    try {
      this.proyecto = await this.servicioProyectos.getProyectoById(this.idProyecto);
    } catch (error) {
      console.error('❌ Error al obtener el proyecto:', error);
    }
  }

  async getTecnologiasDisponibles() {
    try {
      this.tecnologiasDisponibles = await this.servicioTecnologias.getTecnologias();
    } catch (error) {
      console.error('❌ Error al obtener las tecnologías:', error);
    }
  }

  // ✅ Manejar la selección de tecnologías
  toggleTecnologia(tecnologia: string) {
    const index = this.proyecto.tecnologias.indexOf(tecnologia);
    if (index === -1) {
      this.proyecto.tecnologias.push(tecnologia);
    } else {
      this.proyecto.tecnologias.splice(index, 1);
    }
  }

  async actualizarProyecto() {
    try {
      await this.servicioProyectos.editarProyecto(this.idProyecto, this.proyecto);
      alert('✅ Proyecto actualizado con éxito');
      this.router.navigate(['/proyectos']);
    } catch (error) {
      console.error('❌ Error al actualizar el proyecto:', error);
    }
  }

  cancelarEdicion() {
    this.router.navigate(['/proyectos']);
  }
}
