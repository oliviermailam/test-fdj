import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription, filter, switchMap, tap } from 'rxjs';
import { FdjApiService } from '../../shared/services/fdj-api.service';
import { Team } from '@fdj/entities';

@Component({
  selector: 'app-league',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './league.component.html',
  styleUrl: './league.component.scss',
})
export class LeagueComponent implements OnInit, OnDestroy {
  teams: Team[] = [];

  isLoading = true;

  private readonly subscription = new Subscription();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fdjApiService: FdjApiService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.queryParams
        .pipe(
          filter((queryParams) => queryParams['id']),
          switchMap((queryParams) =>
            this.fdjApiService.getLeagueById(queryParams['id'])
          ),
          filter((league) => {
            if (league.teamsIds.size === 0) {
              this.isLoading = false;
              this.teams = [];
              return false;
            }
            return true;
          }),
          switchMap((league) => this.fdjApiService.getTeamsIds(league.teams))
        )
        .subscribe({
          next: (teams) => {
            this.teams = teams;
            this.isLoading = false;
          },
          error: (error) => {
            console.error(error);
          },
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
