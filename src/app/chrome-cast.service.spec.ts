import { TestBed, inject } from '@angular/core/testing';

import { ChromeCastService } from './chrome-cast.service';

describe('ChromeCastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChromeCastService]
    });
  });

  it('should ...', inject([ChromeCastService], (service: ChromeCastService) => {
    expect(service).toBeTruthy();
  }));
});
