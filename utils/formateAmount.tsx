export function formatCurrencyParts(
  input: string | number,
  fallbackCurrency: 'INR' | 'AED' = 'AED',
  locale: 'en-IN' | 'en-US' = 'en-US'
): { currency: string; value: string } {
  const str = typeof input === 'string' ? input.toUpperCase() : String(input);

  // Try to detect currency
  let detectedCurrency: 'INR' | 'AED' = fallbackCurrency;
  if (str.includes('INR')) detectedCurrency = 'INR';
  else if (str.includes('AED')) detectedCurrency = 'AED';

  // Extract numeric value from string
  const numericMatch = str.match(/[\d,]+(\.\d+)?/);
  const numeric = numericMatch ? parseFloat(numericMatch[0].replace(/,/g, '')) : NaN;

  if (isNaN(numeric)) return { currency: '', value: '' };

  // Format the number into currency parts
  const parts = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: detectedCurrency,
    maximumFractionDigits: 0,
  }).formatToParts(numeric);

  const currencyPart = parts.find(p => p.type === 'currency')?.value || '';
  const numberPart = parts
    .filter(p => p.type === 'integer' || p.type === 'group')
    .map(p => p.value)
    .join('');

  return {
    currency: currencyPart,
    value: numberPart,
  };
}
