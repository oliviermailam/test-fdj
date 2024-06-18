import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency',
  standalone: true,
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number, currencyCode: string): string {
    const formattedValue = Math.floor(value).toLocaleString('en-US');

    if (value === 0) {
      return 'Free';
    }

    if (currencyCode === 'eur') {
      return `${formattedValue}€`;
    } else if (currencyCode === 'gpp') {
      return `£${formattedValue}`;
    } else {
      return `${formattedValue} ${currencyCode}`;
    }
  }
}
