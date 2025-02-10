import { Routes } from '@angular/router';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { PerfilComponent } from './perfil/perfil.component';

export const routes: Routes = [
  { path: '', component: ProyectosComponent },
  { path: 'perfil', component: PerfilComponent },
];
