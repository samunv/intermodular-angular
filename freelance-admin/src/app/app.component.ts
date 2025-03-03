import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { PerfilComponent } from './perfil/perfil.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, NgIf, PerfilComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Freelance Admin';
  logo = "/img/Freelance-admin-logo.png";
  isLoginPage = false;
  mostrarPerfil = false; // Controla la visibilidad del modal

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url === '/login';
        if (this.isLoginPage) {
          this.cerrarPerfil(); // Cierra el modal si está en login
        }
      }
    });
  }

  abrirPerfil() {
    this.mostrarPerfil = true;
  }

  cerrarPerfil() {
    this.mostrarPerfil = false;
  }
}
