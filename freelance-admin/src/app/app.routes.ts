import { Routes } from '@angular/router';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProyectosCrearComponent } from './proyectos-crear/proyectos-crear.component';
import { FacturaVistaComponent } from './factura-vista/factura-vista.component'; // Importar componente

export const routes: Routes = [
  { path: '', component: ProyectosComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'proyectos-crear', component: ProyectosCrearComponent },
  { path: 'factura-vista', component: FacturaVistaComponent } // Ajuste en la ruta
];
