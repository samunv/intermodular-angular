import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaVistaComponent } from './factura-vista.component';

describe('FacturaVistaComponent', () => {
  let component: FacturaVistaComponent;
  let fixture: ComponentFixture<FacturaVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturaVistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturaVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
