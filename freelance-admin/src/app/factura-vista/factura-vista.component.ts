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
import { Observable } from 'rxjs';

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
  proyecto$!: Observable<any>;
  nombreproyecto: string = '';
  presupuestoBBDD: string = '';
  presupuestoFinal: number = 0;
  overlay: boolean = false;
  ventanaInfo: boolean = false;
  factura: Factura | null = null;
  btnGuardarActivo: boolean = true;

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
        this.obtenerDatos(this.codigoProyecto);
      }
    });
  }

  /**
   * Obtiene todas las facturas asociadas al código del proyecto y las asigna a facturasFiltradas
   */
  async getFacturas() {
    try {
      const facturasFirebase = await this.facturaServicio.getFacturas(
        this.codigoProyecto
      );
      this.facturas = facturasFirebase.map((factura) => ({
        ...factura,
        total: Number(factura.total) || 0,
      }));
      this.facturasFiltradas = [...this.facturas]; // Solo para mostrar
      this.calcularTotalFacturas(); //Calcula el total después de cargar todo
    } catch (error) {
      console.error('Error al obtener las facturas:', error);
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
        factura.numeroFactura.toLowerCase().includes(filtro) 
    );
    this.calcularTotalFacturas();
  }

  obtenerDatos(codigo: string) {
    this.proyectosServicio.getProyectoByCodigo(codigo).subscribe((proyectos) => {
      if (proyectos.length > 0) {
        const proyecto = proyectos[0];
        this.nombreproyecto = proyecto.nombre;
        this.presupuestoBBDD = proyecto.presupuesto;
      } else {
        console.warn(' Proyecto no encontrado');
      }
    });
  }
  

  calcularTotalFacturas() {
    this.presupuestoFinal = this.facturasFiltradas.reduce(
      (acumulador, factura) => acumulador + (factura.total ?? 0),
      0
    );
  }

  abrirVentanaInfo(numero: string) {
    this.overlay = true;
    this.ventanaInfo = true;
    this.obtenerInfoFactura(numero);
  }

  cerrarVentanaInfo() {
    this.overlay = false;
    this.ventanaInfo = false;
    this.factura = null;
  }

  async obtenerInfoFactura(numero: string) {
    this.factura = await this.facturaServicio.getFacturaByNumero(numero);
  }

  guardarTotalFinal(total: number, codigo: string) {
    this.btnGuardarActivo = false;
    this.proyectosServicio.actualizarPresupuesto(codigo, total);
  }
}
