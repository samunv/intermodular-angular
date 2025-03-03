import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ProyectosServicioService } from '../services/proyectos-servicio.service';
import { TecnologiasService } from '../services/tecnologias.service';
import { FormsModule, NgModel } from '@angular/forms';
import { Proyecto } from '../Proyecto';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, RouterModule, NgFor, NgIf, NgClass, FormsModule],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css',
})
export class ProyectosComponent implements OnInit {
  proyectos: any[] = [];
  tecnologias: any;
  ventanaEliminar: Boolean = false;
  ventanaDetalles: Boolean = false;
  overlay: Boolean = false;
  idProyectoSeleccionado: string = '';
  nombreProyectoSeleccionado: string = '';

  proyecto: Proyecto | null = null;

  textoBuscado: string = '';

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

  abrirVentanaEliminar(id: string, nombre: string) {
    this.idProyectoSeleccionado = id;
    this.ventanaEliminar = true;
    this.nombreProyectoSeleccionado = nombre;
    this.overlay = true;
  }

  cerrarVentanaEliminar() {
    this.idProyectoSeleccionado = '';
    this.ventanaEliminar = false;
    this.nombreProyectoSeleccionado = '';
    this.overlay = false;
  }

  async eliminarProyecto(id: string) {
    try {
      await this.servicioProyectos.eliminarProyecto(id);
      this.proyectos = this.proyectos.filter((proyecto) => proyecto.id !== id);
      this.cerrarVentanaEliminar();
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
    }
  }

  get proyectosFiltrados() {
    return this.proyectos.filter((proyecto) =>
      proyecto.nombre.toLowerCase().includes(this.textoBuscado.toLowerCase())
    );
  }

  abrirVentanaDetalles(id: string) {
    this.ventanaDetalles = true;
    this.overlay = true;
    this.obtenerDetalleProyecto(id);
  }

  cerrarVentanaDetalles() {
    this.ventanaDetalles = false;
    this.overlay = false;
    this.proyecto = null;
  }

  async obtenerDetalleProyecto(id: string) {
    this.proyecto = await this.servicioProyectos.getProyectoById(id);
  }
}
