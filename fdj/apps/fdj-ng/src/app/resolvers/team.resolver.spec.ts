import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { ITeamData, teamResolver } from './team.resolver';

describe('teamResolver', () => {
  const executeResolver: ResolveFn<ITeamData> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => teamResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
