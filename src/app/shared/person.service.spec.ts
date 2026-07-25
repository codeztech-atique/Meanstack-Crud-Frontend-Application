import { TestBed, inject } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { PersonService } from './person.service';

describe('PersonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PersonService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
  });

  it('should be created', inject([PersonService], (service: PersonService) => {
    expect(service).toBeTruthy();
  }));
});
