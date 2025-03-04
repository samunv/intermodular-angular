import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ProyectosServicioService } from '../services/proyectos-servicio.service';
import { TecnologiasService } from '../services/tecnologias.service';
import { FormsModule, NgModel } from '@angular/forms';
import { Proyecto } from '../Proyecto';
import { FacturaServicioService } from '../services/factura-servicio.service';

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
    private servicioFacturas: FacturaServicioService,
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
    this.cerrarVentanaDetalles();
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
      //Seleccionamos el proyecto por su id
      const proyecto = await this.servicioProyectos.getProyectoById(id);

      //Si no es null, llamamos a la función eliminar facturas pcon el codigo del proyecto.
      //Esto lo hacemos para que al borrarse un proyecto, se borren también las facturas asociadas
      if (proyecto) {
        await this.eliminarFacturas(proyecto.codigo);
      }

      await this.servicioProyectos.eliminarProyecto(id);
      this.proyectos = this.proyectos.filter((proyecto) => proyecto.id !== id);
      this.cerrarVentanaEliminar();
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
    }
  }

  async eliminarFacturas(codigo: string) {
    await this.servicioFacturas.eliminarFacturasPorCodigoProyecto(codigo);
  }

  get proyectosFiltrados() {
    return this.proyectos.filter((proyecto) =>
      proyecto.nombre.toLowerCase().includes(this.textoBuscado.toLowerCase())
    );
  }

  abrirVentanaDetalles(id: string) {
    this.cerrarVentanaEliminar();
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
