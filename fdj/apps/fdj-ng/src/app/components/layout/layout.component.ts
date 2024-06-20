import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { League } from '@fdj/entities';
import { Subscription, catchError, switchMap, tap } from 'rxjs';
import { SelectOption } from '../../shared/models/select-option';
import { FdjApiService } from '../../shared/services/fdj-api.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit, OnDestroy {
  leagues: League[] = [];

  selectedLeagueIdControl: FormControl<string | null> = new FormControl(null);
  leaguesOptions: SelectOption[] = [];

  private readonly subscription = new Subscription();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fdjApi: FdjApiService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      (this.activatedRoute.firstChild?.params ?? this.activatedRoute.params)
        .pipe(
          tap((params) => {
            if (params['leagueId']) {
              this.selectedLeagueIdControl.setValue(params['leagueId'], {
                emitEvent: false,
              });
            }
          }),
          switchMap(() => {
            return this.fdjApi.getLeagues();
          }),
          tap((leagues) => {
            this.leagues = leagues;
            this.leaguesOptions = this.leagues.map(
              (league) =>
                new SelectOption({ label: league.name, value: league.id })
            );
          }),
          switchMap(() => {
            return this.selectedLeagueIdControl.valueChanges;
          }),
          catchError((err) => {
            window.alert('An error occured : ' + err.message);
            return [];
          })
        )
        .subscribe({
          next: (selectedLeagueId) => {
            if (selectedLeagueId) {
              this.router.navigate(['/leagues', selectedLeagueId]);
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
