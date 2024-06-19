import { TestBed } from '@angular/core/testing';

import { FdjApiService } from './fdj-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LeagueComponent } from '../../components/league/league.component';

describe('FdjApiService', () => {
  let service: FdjApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, LeagueComponent],
    });
    service = TestBed.inject(FdjApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getData should return data', () => {
    const dummyData = [{ id: '1', name: 'Test' }];

    service.getLeagueById('1').subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3333/api/leagues/1'
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });
});
