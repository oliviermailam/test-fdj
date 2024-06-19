import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Team } from '@fdj/entities';
import { Subscription, catchError, filter, switchMap } from 'rxjs';
import { FdjApiService } from '../../shared/services/fdj-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-league',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './league.component.html',
  styleUrl: './league.component.scss',
})
export class LeagueComponent implements OnInit, OnDestroy {
  teams: Team[] = [];
  leagueId: string;

  isLoading = true;

  private readonly subscription = new Subscription();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fdjApiService: FdjApiService,
    private readonly snackBar: MatSnackBar
  ) {
    this.leagueId = this.activatedRoute.snapshot.params['leagueId'];
  }

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.params
        .pipe(
          switchMap((params) =>
            this.fdjApiService.getLeagueById(params['leagueId'])
          ),
          filter((league) => {
            if (league.teamsIds.size === 0) {
              this.isLoading = false;
              this.teams = [];
              return false;
            }
            return true;
          }),
          switchMap((league) => this.fdjApiService.getTeamsIds(league.teams)),
          catchError((err) => {
            this.snackBar.open('An error occured : ' + err.message, 'Close', {
              duration: 5000,
              verticalPosition: 'top',
            });
            return [];
          })
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
