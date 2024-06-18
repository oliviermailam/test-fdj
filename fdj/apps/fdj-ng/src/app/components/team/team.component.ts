import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '@fdj/entities';
import { filter, switchMap } from 'rxjs';
import { FdjApiService } from '../../shared/services/fdj-api.service';
import { CustomCurrencyPipe } from '../../pipes/customCurrency.pipe';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, CustomCurrencyPipe],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent implements OnInit {
  players: Player[] = [];

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
          this.fdjApiService.getTeamsIdPlayers(queryParams['id'])
        )
      )
      .subscribe({
        next: (players) => {
          this.players = players;
          this.isLoading = false;
        },
        error: (err) => {
          console.log('Error: ', err);
          this.players = [];
          this.isLoading = false;
        },
      });
  }
}
