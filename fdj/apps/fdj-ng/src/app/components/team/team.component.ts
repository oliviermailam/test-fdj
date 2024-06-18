import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player, Team } from '@fdj/entities';
import { combineLatest, filter, switchMap, tap } from 'rxjs';
import { FdjApiService } from '../../shared/services/fdj-api.service';
import { CustomCurrencyPipe } from '../../pipes/customCurrency.pipe';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, CustomCurrencyPipe],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent implements OnInit {
  players: Player[] = [];
  team?: Team;

  isLoading = true;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fdjApiService: FdjApiService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        filter((queryParams) => queryParams['id']),
        switchMap((queryParams) =>
          combineLatest([
            this.fdjApiService.getTeamId(queryParams['id']),
            this.fdjApiService.getTeamsIdPlayers(queryParams['id']),
          ])
        )
      )
      .subscribe({
        next: ([team, players]) => {
          this.team = team;
          this.players = players;
          this.isLoading = false;
        },
        error: (err) => {
          console.log('Error: ', err);
          this.team = undefined;
          this.players = [];
          this.isLoading = false;
        },
      });
  }
}
