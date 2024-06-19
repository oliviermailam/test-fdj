import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { League, Player, Team } from '@fdj/entities';
import { Subscription } from 'rxjs';
import { ITeamData } from '../../resolvers/team.resolver';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent implements OnInit, OnDestroy {
  league: League;
  team: Team;
  players: Player[] = [];

  private subscription = new Subscription();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.league = (
      this.activatedRoute.snapshot.data['teamResolver'] as ITeamData
    ).league;
    this.team = (
      this.activatedRoute.snapshot.data['teamResolver'] as ITeamData
    ).team;
    this.players = (
      this.activatedRoute.snapshot.data['teamResolver'] as ITeamData
    ).players;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.data.subscribe({
        next: ({ teamResolver }) => {
          this.league = teamResolver.league;
          this.team = teamResolver.team;
          this.players = teamResolver.players;
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  back(): void {
    this.router.navigate(['/leagues', this.league.id]);
  }
}
