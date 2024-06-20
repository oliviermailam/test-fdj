import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILeague, IPlayer, ITeam, League, Player, Team } from '@fdj/entities';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FdjApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  protected leaguesUrl(): string {
    return `${this.baseUrl}/leagues`;
  }

  getLeagues(): Observable<League[]> {
    return this.http
      .get<ILeague[]>(this.leaguesUrl())
      .pipe(map((leagues) => leagues.map((league) => new League(league))));
  }

  getLeagueById(id: string): Observable<League> {
    return this.http
      .get<ILeague>(`${this.leaguesUrl()}/${id}`)
      .pipe(map((league) => new League(league)));
  }

  protected teamsApiUrl(): string {
    return `${this.baseUrl}/teams`;
  }

  getTeamsIds(teamsIds: string[]): Observable<Team[]> {
    return this.http
      .get<ITeam[]>(`${this.teamsApiUrl()}/ids/${teamsIds.join(',')}`)
      .pipe(map((teams) => teams.map((team) => new Team(team))));
  }

  getTeamId(teamId: string): Observable<Team> {
    return this.http.get<ITeam>(`${this.teamsApiUrl()}/${teamId}`).pipe(
      map((team) => {
        return new Team(team);
      })
    );
  }

  getTeamsIdPlayers(teamId: string): Observable<Player[]> {
    return this.http
      .get<IPlayer[]>(`${this.teamsApiUrl()}/${teamId}/players`)
      .pipe(map((players) => players.map((player) => new Player(player))));
  }

  protected playersApiUrl(): string {
    return `${this.baseUrl}/players`;
  }

  getPlayerId(playerId: string): Observable<Player> {
    return this.http
      .get<IPlayer>(`${this.playersApiUrl()}/${playerId}`)
      .pipe(map((player) => new Player(player)));
  }
}
