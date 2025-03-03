import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from './services/auth.service'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Freelance Admin';
  logo = "/img/Freelance-admin-logo.png";
  isLoginPage = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {    const usuario = this.authService.getUsuarioActual();
    console.log('Usuario autenticado en AppComponent:', usuario);

    if (usuario) {
      this.router.navigate(['/proyectos']); 
    } else {
      this.router.navigate(['/login']); 
    }
  }
}
