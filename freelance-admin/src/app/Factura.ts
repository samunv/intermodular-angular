export interface Factura {
  id?: string; // Opcional porque Firebase genera su propio ID
  numeroFactura: string;

  nombre?: string; // nombre del emisor
  cif?: string; // cif del emisor
  direccion?: string; // dirección del emisor

  cliente: string;
  cifCliente: string;
  direccionCliente: string;

  fecha: string;
  baseImponible: number;
  iva: number;
  irpf: number;
  total?: number; // Total calculado
  tipo?: string;
  codigoProyecto: string; // Código del proyecto asociado
}
