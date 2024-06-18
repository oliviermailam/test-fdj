import { CustomCurrencyPipe } from './customCurrency.pipe';

describe('CurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomCurrencyPipe();
    expect(pipe).toBeTruthy();
  });
});
