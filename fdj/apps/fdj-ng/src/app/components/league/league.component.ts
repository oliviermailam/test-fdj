import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { League, Team } from '@fdj/entities';
import { Subscription } from 'rxjs';
import { ILeagueData } from '../../resolvers/league.resolver';

@Component({
  selector: 'app-league',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './league.component.html',
  styleUrl: './league.component.scss',
})
export class LeagueComponent implements OnInit, OnDestroy {
  teams: Team[] = [];
  league: League;

  private readonly subscription = new Subscription();

  constructor(private readonly activatedRoute: ActivatedRoute) {
    this.league = (
      this.activatedRoute.snapshot.data['leagueResolver'] as ILeagueData
    ).league;
    this.teams = (
      this.activatedRoute.snapshot.data['leagueResolver'] as ILeagueData
    ).teams;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.data.subscribe({
        next: ({ leagueResolver }) => {
          this.league = leagueResolver.league;
          this.teams = leagueResolver.teams;
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
