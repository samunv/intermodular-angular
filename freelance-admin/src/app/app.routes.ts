import { Routes } from '@angular/router';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProyectosCrearComponent } from './proyectos-crear/proyectos-crear.component';
import { FacturaVistaComponent } from './factura-vista/factura-vista.component'; 
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige al login
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'proyectos', component: ProyectosComponent },
  { path: 'proyectos-crear', component: ProyectosCrearComponent },
  { path: 'factura-vista/:codigo', component: FacturaVistaComponent } 
];
