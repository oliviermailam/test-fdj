import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { League } from '@fdj/entities';
import { Subscription, switchMap, tap } from 'rxjs';

import { SelectOption } from './shared/models/select-option';
import { FdjApiService } from './shared/services/fdj-api.service';
import { SharedModule } from './shared/shared.module';

@Component({
  standalone: true,
  imports: [RouterModule, SharedModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'fdj-ng';

  leagues: League[] = [];

  selectedLeagueIdControl: FormControl<string | null> = new FormControl(null);
  leaguesOptions: SelectOption[] = [];

  private readonly subscription = new Subscription();

  constructor(
    private readonly fdjApi: FdjApiService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.fdjApi
        .getLeagues()
        .pipe(
          tap((leagues) => {
            this.leagues = leagues;
            this.leaguesOptions = this.leagues.map(
              (league) =>
                new SelectOption({ label: league.name, value: league.id })
            );
          }),
          switchMap(() => {
            return this.selectedLeagueIdControl.valueChanges;
          })
        )
        .subscribe({
          next: (selectedLeagueId) => {
            if (selectedLeagueId) {
              this.router.navigate(['/leagues'], {
                queryParams: { id: selectedLeagueId },
              });
            } else {
              this.router.navigate(['/']);
            }
          },
          error: (err) => {
            console.error(err);
          },
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
