export interface Proyecto {
  id?: string;
  nombre: string;
  descripcion: string;
  estado: string;
  tecnologias: string[];
  foto: string;
  id_factura?: string;
  presupuesto: number;
  codigo: string;
  autor: string;
}
