export interface Proyecto {
  id?: string;  // ✅ Se agrega 'id' como opcional
  nombre: string;
  descripcion: string;
  estado: string;
  tecnologias: string[];
  foto: string;
  id_factura?: string;
  presupuesto: number;
  codigo: string;
}
