import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, RouterEvent, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  logo = "/img/Freelance-admin-logo.png";


  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService.login(this.email, this.password)
      .then(() => {
        alert('Inicio de sesión exitoso');
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
