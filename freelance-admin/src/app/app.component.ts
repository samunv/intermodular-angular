import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProyectosComponent } from './proyectos/proyectos.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, RouterLink, ProyectosComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	title = 'Freelance Admin';
	logo = "/img/Freelance-admin-logo.png";
}
