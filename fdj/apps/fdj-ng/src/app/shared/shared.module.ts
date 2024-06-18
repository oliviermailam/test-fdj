import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FdjApiService } from './services/fdj-api.service';
import { InputSelectComponent } from './input-select/input-select.component';
import { CustomCurrencyPipe } from '../pipes/customCurrency.pipe';

@NgModule({
  declarations: [InputSelectComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CustomCurrencyPipe,
  ],
  exports: [InputSelectComponent],
  providers: [FdjApiService, CustomCurrencyPipe],
})
export class SharedModule {}
