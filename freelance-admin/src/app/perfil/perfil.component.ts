import { CommonModule } from '@angular/common'; //  Importar CommonModule
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-perfil',
  standalone: true, //  Necesario en Angular 19
  imports: [CommonModule], //  Agregar CommonModule aquí
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  usuario: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.usuario = this.authService.getUsuarioActual();
  }

  logout() {
    this.authService.logout();
  }
}
