
export function formatAmount(amount: number) {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 2 });
}

export function formatCount(num: number) {
  return num.toLocaleString('en-US');
}