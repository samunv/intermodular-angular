import {
  CommonModule,
  NgClass,
  NgFor,
  NgIf,
  CurrencyPipe,
} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FacturaServicioService } from '../services/factura-servicio.service';
import { Factura } from '../Factura';
import { RouterModule, RouterLink, ActivatedRoute } from '@angular/router';
import { ProyectosServicioService } from '../services/proyectos-servicio.service';

@Component({
  selector: 'app-factura-vista',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgFor,
    NgIf,
    NgClass,
    CurrencyPipe,
    RouterLink,
  ],
  templateUrl: './factura-vista.component.html',
  styleUrl: './factura-vista.component.css',
})
export class FacturaVistaComponent implements OnInit {
  codigoProyecto: string = ''; // Código del proyecto obtenido de la URL
  facturas: Factura[] = []; // Lista de todas las facturas
  facturasFiltradas: Factura[] = []; // Lista de facturas filtradas
  proyecto: any;
  nombreproyecto: String = '';
  presupuestoFinal: number = 0;

  constructor(
    private facturaServicio: FacturaServicioService,
    private route: ActivatedRoute,
    private proyectosServicio: ProyectosServicioService
  ) {}

  ngOnInit() {
    // Obtener el código del proyecto desde la URL
    this.route.paramMap.subscribe((params) => {
      this.codigoProyecto = params.get('codigo') || ''; // Obtener el código desde la URL
      if (this.codigoProyecto) {
        this.getFacturas(); // Cargar las facturas del proyecto
        this.obtenerNombreProyecto(this.codigoProyecto);
      }
    });
  }

  /**
   * Obtiene todas las facturas asociadas al código del proyecto y las asigna a facturasFiltradas
   */
  async getFacturas() {
    try {
      const facturasFirebase = await this.facturaServicio.getFacturas(this.codigoProyecto);
      this.facturas = facturasFirebase.map(factura => ({
        ...factura,
        total: Number(factura.total) || 0
      }));
      this.facturasFiltradas = [...this.facturas]; // Solo para mostrar
      this.calcularTotalFacturas(); // ✅ Calcula el total después de cargar todo
    } catch (error) {
      console.error('❌ Error al obtener las facturas:', error);
    }
  }
  
  

  /**
   * Filtra las facturas según la búsqueda del usuario
   * @param event Evento de entrada del usuario
   */
  buscarFactura(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.toLowerCase();
    this.facturasFiltradas = this.facturas.filter(
      (factura) =>
        factura.numeroFactura.toLowerCase().includes(filtro) ||
        factura.cliente.toLowerCase().includes(filtro)
    );
    this.calcularTotalFacturas();
  }

  async obtenerNombreProyecto(codigo: string) {
    this.proyecto = await this.proyectosServicio.getProyectoByCodigo(codigo);
    this.nombreproyecto = this.proyecto.nombre;
  }

  calcularTotalFacturas() {
    this.presupuestoFinal = this.facturasFiltradas.reduce(
      (acumulador, factura) => acumulador + (factura.total ?? 0),
      0
    );
  }
  
  
  
  
  
}
