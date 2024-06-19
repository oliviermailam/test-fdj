import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerCardComponent } from './player-card.component';

describe('PlayerCardComponent', () => {
  let component: PlayerCardComponent;
  let fixture: ComponentFixture<PlayerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerCardComponent);
    component = fixture.componentInstance;
    component.player = {
      id: '1',
      name: 'John Doe',
      position: 'GK',
      thumbnail: 'https://via.placeholder.com/150',
      signin: {
        amount: 1,
        currency: 'eur',
      },
      born: new Date('1990-01-01'),
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
