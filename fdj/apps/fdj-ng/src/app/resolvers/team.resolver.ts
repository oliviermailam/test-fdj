import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { League, Player, Team } from '@fdj/entities';
import { catchError, combineLatest, map, of, switchMap } from 'rxjs';
import { FdjApiService } from '../shared/services/fdj-api.service';

export interface ITeamData {
  league: League;
  team: Team;
  players: Player[];
}

export const teamResolver: ResolveFn<ITeamData> = (route) => {
  const fdjApiService = inject(FdjApiService);
  const router = inject(Router);

  return fdjApiService.getLeagueById(route.params['leagueId']).pipe(
    switchMap((league) => {
      const teamId = route.params['teamId'];
      if (!league.teamsIds.has(teamId)) {
        throw new Error(`Team does not belong to ${league.name}`);
      }
      return combineLatest([
        of(league),
        fdjApiService.getTeamId(teamId),
        fdjApiService.getTeamsIdPlayers(teamId),
      ]);
    }),
    map(([league, team, players]) => ({ league, team, players })),
    catchError((err) => {
      window.alert('An error occured : ' + err.message);
      router.navigate(['/']);
      return [];
    })
  );
};
