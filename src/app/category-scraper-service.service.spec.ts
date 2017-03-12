import { TestBed, inject } from '@angular/core/testing';

import { CategoryScraperServiceService } from './category-scraper-service.service';

describe('CategoryScraperServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryScraperServiceService]
    });
  });

  it('should ...', inject([CategoryScraperServiceService], (service: CategoryScraperServiceService) => {
    expect(service).toBeTruthy();
  }));
});
