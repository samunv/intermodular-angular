export interface Proyecto {
  nombre_proyecto: string; // Nombre del proyecto (obligatorio)
  descripcion: string; // Descripción del proyecto
  estado: 'Planificado' | 'En desarrollo' | 'En progreso' | 'Completado'; // Estado con valores limitados
  tecnologias: string[]; // Lista de tecnologías utilizadas
  foto: string; // SRC de una foto del proyecto
  id_factura: string; // ID generado de la factura
}
