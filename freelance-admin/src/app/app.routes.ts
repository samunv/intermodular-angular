import { Routes } from '@angular/router';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProyectosCrearComponent } from './proyectos-crear/proyectos-crear.component';

export const routes: Routes = [
  { path: '', component: ProyectosComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'proyectos-crear', component: ProyectosCrearComponent } // Ajuste en la ruta
];
