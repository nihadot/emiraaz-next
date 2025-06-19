export function formatCurrencyConversion(value: string, rate: number): string {
  const cleaned = Math.floor(Number(value.replace(/,/g, '').split('.')[0])); // Step 1
  const result = Math.floor(cleaned * rate); // Step 2
  return result.toLocaleString(); // Step 3
}
