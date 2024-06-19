import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomCurrencyPipe } from '../pipes/customCurrency.pipe';
import { InputSelectComponent } from './components/input-select/input-select.component';
import { PlayerCardComponent } from './components/player-card/player-card.component';
import { FdjApiService } from './services/fdj-api.service';

@NgModule({
  declarations: [InputSelectComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CustomCurrencyPipe,
    PlayerCardComponent,
  ],
  exports: [InputSelectComponent, PlayerCardComponent],
  providers: [FdjApiService, CustomCurrencyPipe],
})
export class SharedModule {}
