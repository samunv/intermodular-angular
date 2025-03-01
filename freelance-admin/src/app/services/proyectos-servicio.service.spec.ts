import { TestBed } from '@angular/core/testing';

import { ProyectosServicioService } from './proyectos-servicio.service';

describe('ProyectosServicioService', () => {
  let service: ProyectosServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProyectosServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
