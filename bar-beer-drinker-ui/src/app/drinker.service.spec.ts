import { TestBed, inject } from '@angular/core/testing';

import { DrinkerService } from './drinker.service';

describe('DrinkerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrinkerService]
    });
  });

  it('should be created', inject([DrinkerService], (service: DrinkerService) => {
    expect(service).toBeTruthy();
  }));
});
