import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamComponent } from './team.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              teamResolver: {
                league: { id: '123', name: 'League' },
                team: { id: '234', name: 'Team' },
                players: [
                  {
                    id: '345',
                    name: 'Player',
                    signin: { amount: 1, currency: 'eur' },
                  },
                ],
              },
            }),
            snapshot: {
              data: {
                teamResolver: {
                  league: { id: '123', name: 'League' },
                  team: { id: '234', name: 'Team' },
                  players: [{ id: '345', name: 'Player' }],
                },
              },
            },
            params: of({ leagueId: '123', teamId: '234' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
