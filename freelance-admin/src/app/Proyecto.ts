export interface Proyecto {
    nombre_proyecto?: string;
    autor?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
    estado?: 'Planificado' | 'En desarrollo' | 'En progreso' | 'Completado';
    tecnologias?: string[];
  }
  