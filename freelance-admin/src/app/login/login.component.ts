import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService.login(this.email, this.password)
      .then(() => {
        alert('Inicio de sesión exitoso');
        this.router.navigate(['/proyectos']); 
      })
      .catch(error => alert('Error: ' + error.message));
  }

  register() {
    this.loginService.register(this.email, this.password)
      .then(() => {
        alert('Usuario registrado correctamente');
        this.router.navigate(['/proyectos']); 
      })
      .catch(error => alert('Error: ' + error.message));
  }

  loginWithGoogle() {
    this.loginService.loginWithGoogle()
      .then(() => {
        alert('Inicio de sesión con Google exitoso');
        this.router.navigate(['/proyectos']); 
      })
      .catch(error => alert('Error: ' + error.message));
  }
}
