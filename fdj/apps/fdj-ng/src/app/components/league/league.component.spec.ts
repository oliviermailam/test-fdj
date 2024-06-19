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
            snapshot: { params: { leagueId: '123', teamId: '234' } },
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
