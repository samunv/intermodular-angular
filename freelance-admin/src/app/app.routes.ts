import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'perfil', loadComponent: () => import('./perfil/perfil.component').then(m => m.PerfilComponent) },
  { path: 'proyectos', loadComponent: () => import('./proyectos/proyectos.component').then(m => m.ProyectosComponent) },
  { path: 'proyectos-crear', loadComponent: () => import('./proyectos-crear/proyectos-crear.component').then(m => m.ProyectosCrearComponent) },
  { path: 'factura-vista/:codigo', loadComponent: () => import('./factura-vista/factura-vista.component').then(m => m.FacturaVistaComponent) },
  { path: 'proyectos-editar/:id', loadComponent: () => import('./proyectos-editar/proyectos-editar.component').then(m => m.ProyectosEditarComponent) }
];
