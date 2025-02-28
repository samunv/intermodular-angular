import { TestBed } from '@angular/core/testing';

import { FacturaServicioService } from './factura-servicio.service';

describe('FacturaServicioService', () => {
  let service: FacturaServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturaServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
