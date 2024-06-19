import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResolveFn, Router } from '@angular/router';
import { League, Team } from '@fdj/entities';
import { catchError, combineLatest, map, of, switchMap } from 'rxjs';
import { FdjApiService } from '../shared/services/fdj-api.service';

export interface ILeagueData {
  league: League;
  teams: Team[];
}

export const leagueResolver: ResolveFn<ILeagueData> = (route) => {
  const fdjApiService = inject(FdjApiService);
  const snack = inject(MatSnackBar);
  const router = inject(Router);

  return fdjApiService.getLeagueById(route.params['leagueId']).pipe(
    switchMap((league) => {
      return combineLatest([
        of(league),
        league.teams.length > 0
          ? fdjApiService.getTeamsIds(league.teams)
          : of([]),
      ]);
    }),
    map(([league, teams]) => ({ league, teams })),
    catchError((err) => {
      snack.open('An error occured : ' + err.message, 'Close', {
        duration: 5000,
        verticalPosition: 'top',
      });
      router.navigate(['/']);
      return [];
    })
  );
};
