import { TestBed } from '@angular/core/testing';

import { FdjApiService } from './fdj-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LeagueComponent } from '../../components/league/league.component';

describe('FdjApiService', () => {
  let service: FdjApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, LeagueComponent],
    });
    service = TestBed.inject(FdjApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
