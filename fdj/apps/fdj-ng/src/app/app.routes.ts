import { Route } from '@angular/router';
import { LeagueComponent } from './components/league/league.component';
import { AppComponent } from './app.component';
import { TeamComponent } from './components/team/team.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'leagues',
    component: LeagueComponent,
  },
  {
    path: 'teams',
    component: TeamComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
