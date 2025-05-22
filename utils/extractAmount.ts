export function extractNumber(str:string) {
  if (typeof str !== 'string') return 0;
  const numeric = str.replace(/,/g, ''); // Remove commas
  return parseFloat(numeric); // Convert to number
}