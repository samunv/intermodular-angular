import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { FormsModule } from '@angular/forms';


@Component({
	selector: 'app-root',
	imports: [RouterOutlet, RouterLink, ProyectosComponent,FormsModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	title = 'Freelance Admin';
	logo = "/img/Freelance-admin-logo.png";

	isLoginPage = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url === '/login';
    });
  }
}



