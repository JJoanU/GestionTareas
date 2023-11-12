import { TestBed } from '@angular/core/testing';

import { ServCatalogoService } from './serv-catalogo.service';

describe('ServCatalogoService', () => {
  let service: ServCatalogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServCatalogoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
