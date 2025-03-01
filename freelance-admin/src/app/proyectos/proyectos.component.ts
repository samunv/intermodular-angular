import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ProyectosServicioService } from '../services/proyectos-servicio.service';
import { TecnologiasService } from '../services/tecnologias.service';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, RouterModule, NgFor, NgIf, NgClass],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css',
})
export class ProyectosComponent implements OnInit {
  proyectos: any[] = [];
  tecnologias: any;

  constructor(
    private servicioProyectos: ProyectosServicioService,
    private servicioTecnologias: TecnologiasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProyectos();
    this.getTecnologias();
  }

  async getProyectos() {
    this.proyectos = await this.servicioProyectos.getProyectos();
  }

  async getTecnologias() {
    this.tecnologias = await this.servicioTecnologias.getTecnologias();
  }

  editarProyecto(id: string) {
    this.router.navigate(['/proyectos-editar', id]);
  }
  

  async eliminarProyecto(id: string) {
    if (confirm('¿Seguro que quieres eliminar este proyecto?')) {
      try {
        await this.servicioProyectos.eliminarProyecto(id);
        this.proyectos = this.proyectos.filter(proyecto => proyecto.id !== id);
      } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
      }
    }
  }
}
