import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player, Team } from '@fdj/entities';
import { Subscription, combineLatest, filter, switchMap, tap } from 'rxjs';
import { FdjApiService } from '../../shared/services/fdj-api.service';
import { CustomCurrencyPipe } from '../../pipes/customCurrency.pipe';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, CustomCurrencyPipe],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent implements OnInit, OnDestroy {
  players: Player[] = [];
  team?: Team;
  leagueId?: string;

  isLoading = true;
  private subscription = new Subscription();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fdjApiService: FdjApiService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.queryParams
        .pipe(
          tap((queryParams) => (this.leagueId = queryParams['leagueId'])),
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
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  back(): void {
    this.router.navigate(['/leagues'], { queryParams: { id: this.leagueId } });
  }
}
