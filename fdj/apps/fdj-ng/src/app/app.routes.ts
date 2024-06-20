import { Route } from '@angular/router';
import { LeagueComponent } from './components/league/league.component';
import { TeamComponent } from './components/team/team.component';
import { LayoutComponent } from './components/layout/layout.component';
import { leagueResolver } from './resolvers/league.resolver';
import { teamResolver } from './resolvers/team.resolver';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'leagues/:leagueId',
        component: LeagueComponent,
        resolve: { leagueResolver: leagueResolver },
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'leagues/:leagueId/teams/:teamId',
    component: TeamComponent,
    resolve: { teamResolver: teamResolver },
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
