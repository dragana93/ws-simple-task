import { TestBed } from '@angular/core/testing';

import { RepositoriesSearchService } from './repositories-search.service';

describe('RepositoriesSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepositoriesSearchService = TestBed.get(RepositoriesSearchService);
    expect(service).toBeTruthy();
  });
});
