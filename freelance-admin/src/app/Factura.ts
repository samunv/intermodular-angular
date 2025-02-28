export interface Factura {
    id?: string; // Opcional porque Firebase genera su propio ID
    numeroFactura: string;
    cliente: string;
    fecha: string;
    baseImponible: number;
    iva: number;
    irpf: number;
    total?: number; // Total calculado
    codigoProyecto: string; // Código del proyecto asociado
  }
  