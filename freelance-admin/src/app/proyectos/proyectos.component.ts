import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProyectosServicioService } from '../proyectos-servicio.service';
import { Proyecto } from '../Proyecto';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-proyectos',
  imports: [NgFor,RouterOutlet, RouterLink, ProyectosComponent, NgClass],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css',
})
export class ProyectosComponent{
  proyectos: any;

  constructor(private servicio: ProyectosServicioService) {}

  ngOnInit() {
    this.getProyectos();
  }

  async getProyectos() {
    this.proyectos = await this.servicio.getProyectos();
  }
}
