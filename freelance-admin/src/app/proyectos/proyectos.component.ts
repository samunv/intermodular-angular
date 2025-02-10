import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProyectosServicioService } from '../proyectos-servicio.service';
import { Proyecto } from '../Proyecto';

@Component({
  selector: 'app-proyectos',
  imports: [NgFor],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css',
})
export class ProyectosComponent implements OnInit {
  proyectos: Proyecto[] = [];

  constructor(private servicio: ProyectosServicioService) {}

  ngOnInit(): void {
    this.servicio.obtenerTodos().subscribe((datos: Proyecto[]) => {
      this.proyectos = datos;
      console.log(this.proyectos);
    });
  }
}
