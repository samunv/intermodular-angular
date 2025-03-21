import { Component } from '@angular/core';
import { RegistroService } from '../services/registro.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-registro',
  imports: [FormsModule, RouterLink], // Agregar FormsModule
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  logo = "../img/Freelance-admin-logo.png";


  constructor(private registroService: RegistroService, private router: Router) {}

  /**
   * Maneja el proceso de registro
   */
  async register() {
    if (!this.email || !this.password || !this.confirmPassword) {
      alert('⚠️ Todos los campos son obligatorios.');
      return;
    }
  
    if (!this.isValidEmail(this.email)) {
      alert('⚠️ Ingresa un correo válido.');
      return;
    }
  
    if (this.password.length < 6) {
      alert('⚠️ La contraseña debe tener al menos 6 caracteres.');
      return;
    }
  
    if (this.password !== this.confirmPassword) {
      alert('⚠️ Las contraseñas no coinciden.');
      return;
    }
  
    try {
      await this.registroService.register(this.email, this.password);
      alert('✅ Registro exitoso');
      this.router.navigate(['/login']); // Redirigir al login
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert('❌ ' + error.message);
      } else {
        alert('❌ Error desconocido en el registro');
      }
    }
  }

  /**
   * Verifica si el email es válido con una expresión regular
   */
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
}
