import { TestBed } from '@angular/core/testing';

import { AutenticadoService } from './autenticado.service';

describe('AutenticadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutenticadoService = TestBed.get(AutenticadoService);
    expect(service).toBeTruthy();
  });
});
