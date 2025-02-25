export interface Proyecto {
  id?: string; // ID opcional generado por Firebase
  nombre_proyecto: string; // Nombre del proyecto (obligatorio)
  autor: string; // Nombre del autor
  fecha_inicio: Date; // Tipo Date en lugar de string
  fecha_fin?: Date; // Fecha opcional, también como Date
  estado: 'Planificado' | 'En desarrollo' | 'En progreso' | 'Completado'; // Estado con valores limitados
  tecnologias: string[]; // Lista de tecnologías utilizadas
}
