import { Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard'; // Importamos el AuthGuard

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'registro', loadComponent: () => import('./registro/registro.component').then(m => m.RegistroComponent) }, // Nueva ruta


  //  Rutas protegidas por el AuthGuard
  { path: 'perfil', loadComponent: () => import('./perfil/perfil.component').then(m => m.PerfilComponent), canActivate: [AuthGuard] },
  { path: 'proyectos', loadComponent: () => import('./proyectos/proyectos.component').then(m => m.ProyectosComponent), canActivate: [AuthGuard] },
  { path: 'proyectos-crear', loadComponent: () => import('./proyectos-crear/proyectos-crear.component').then(m => m.ProyectosCrearComponent), canActivate: [AuthGuard] },
  { path: 'factura-vista/:codigo', loadComponent: () => import('./factura-vista/factura-vista.component').then(m => m.FacturaVistaComponent), canActivate: [AuthGuard] },
  { path: 'proyectos-editar/:id', loadComponent: () => import('./proyectos-editar/proyectos-editar.component').then(m => m.ProyectosEditarComponent), canActivate: [AuthGuard] },

  //  Cualquier ruta incorrecta redirige al login
  { path: '**', redirectTo: 'login' }
];
