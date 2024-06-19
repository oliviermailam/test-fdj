import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '@fdj/entities';
import { CustomCurrencyPipe } from '../../../pipes/customCurrency.pipe';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [CommonModule, CustomCurrencyPipe],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss',
})
export class PlayerCardComponent {
  @Input() player!: Player;
}
