import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player, Team } from '@fdj/entities';
import { Subscription, catchError, combineLatest } from 'rxjs';
import { FdjApiService } from '../../shared/services/fdj-api.service';
import { SharedModule } from '../../shared/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent implements OnInit, OnDestroy {
  players: Player[] = [];
  team: Team | undefined;

  teamId: string;
  leagueId: string;

  isLoading = true;
  private subscription = new Subscription();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fdjApiService: FdjApiService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {
    this.leagueId = this.activatedRoute.snapshot.params['leagueId'];
    this.teamId = this.activatedRoute.snapshot.params['teamId'];
  }

  ngOnInit(): void {
    this.subscription.add(
      combineLatest([
        this.fdjApiService.getTeamId(this.teamId),
        this.fdjApiService.getTeamsIdPlayers(this.teamId),
      ])
        .pipe(
          catchError((err) => {
            this.snackBar.open('An error occured : ' + err.message, 'Close', {
              duration: 5000,
              verticalPosition: 'top',
            });
            return [];
          })
        )
        .subscribe({
          next: ([team, players]) => {
            this.team = team;
            this.players = players;
            this.isLoading = false;
          },
          error: (err) => {
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
    this.router.navigate(['/leagues', this.leagueId]);
  }
}
