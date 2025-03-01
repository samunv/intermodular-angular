import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProyectosServicioService } from '../services/proyectos-servicio.service';
import { Proyecto } from '../Proyecto';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TecnologiasService } from '../services/tecnologias.service';


@Component({
  selector: 'app-proyectos',
  imports: [NgFor, RouterOutlet, RouterLink, ProyectosComponent, NgClass, NgIf],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css',
})
export class ProyectosComponent {
  proyectos: any;
  tecnologias: any;

  constructor(
    private servicioProyectos: ProyectosServicioService,
    private servicioTecnologias: TecnologiasService
  ) {}

  ngOnInit() {
    this.getProyectos();
    this.getTecnologias();
  }

  async getProyectos() {
    this.proyectos = await this.servicioProyectos.getProyectos();
  }

  async getTecnologias(){
    this.tecnologias = await this.servicioTecnologias.getTecnologias();
  }
}
