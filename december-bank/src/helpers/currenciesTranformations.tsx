export const getCurrencySymbol = (currencyName: string): string =>
  currencyName === 'URU' ? '$' : currencyName === 'USD' ? 'U$S' : '€';

export default getCurrencySymbol;
