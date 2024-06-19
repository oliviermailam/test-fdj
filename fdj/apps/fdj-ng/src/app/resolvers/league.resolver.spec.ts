import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { ILeagueData, leagueResolver } from './league.resolver';

describe('leagueResolver', () => {
  const executeResolver: ResolveFn<ILeagueData> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => leagueResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
