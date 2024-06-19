import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeagueComponent } from './league.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('LeagueComponent', () => {
  let component: LeagueComponent;
  let fixture: ComponentFixture<LeagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              leagueResolver: {
                league: { id: '123', name: 'League' },
                teams: [{ id: '234', name: 'Team' }],
              },
            }),
            snapshot: {
              data: {
                leagueResolver: {
                  league: { id: '123', name: 'League' },
                  teams: [{ id: '234', name: 'Team' }],
                },
              },
            },
            params: of({ leagueId: '123', teamId: '234' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
