import { Route } from '@angular/router';
import { LeagueComponent } from './components/league/league.component';
import { TeamComponent } from './components/team/team.component';
import { LayoutComponent } from './components/layout/layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'leagues/:leagueId',
        component: LeagueComponent,
        pathMatch: 'full',
      },
      {
        path: 'leagues/:leagueId/teams/:teamId',
        component: TeamComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
