import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  usuario: User | null = null;

  @Input() cerrarVentana!: () => void; // Recibe la función para cerrar el modal

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.usuario = this.authService.getUsuarioActual();
  }

  logout() {
    this.authService.logout();
    this.cerrarVentana(); // Cierra el modal antes de redirigir
    this.router.navigate(['/login']); // Redirige al login
  }
}
