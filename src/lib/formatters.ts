// ============================================
// FORMATTING UTILITIES
// ============================================

/**
 * Format number to Vietnamese currency (VND)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount)) + ' đ';
}

/**
 * Format number to percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return value.toFixed(decimals) + '%';
}

/**
 * Format number with thousand separators (no currency)
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('vi-VN').format(Math.round(value));
}

/**
 * Parse formatted currency string to number
 */
export function parseCurrency(value: string): number {
  // Remove all non-digit characters except decimal point
  const cleaned = value.replace(/[^\d]/g, '');
  return parseInt(cleaned, 10) || 0;
}

/**
 * Format large numbers to readable format (e.g., 20tr, 1.5 tỷ)
 */
export function formatCompact(amount: number): string {
  const absAmount = Math.abs(amount);
  
  if (absAmount >= 1_000_000_000) {
    return (amount / 1_000_000_000).toFixed(1) + ' tỷ';
  }
  
  if (absAmount >= 1_000_000) {
    return (amount / 1_000_000).toFixed(1) + ' tr';
  }
  
  return formatNumber(amount) + ' đ';
}

