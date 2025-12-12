import { TaxLaw, RegionalWage, RegionId } from '../types';

// ============================================
// TAX LAWS CONFIGURATION
// ============================================

export const TAX_LAWS: Record<string, TaxLaw> = {
  before2026: {
    id: 'before2026',
    name: 'Luật thuế hiện hành',
    effectiveFrom: '2020-07-01',
    description: 'Áp dụng đến hết năm 2025',
    personalDeduction: 11_000_000,
    dependentDeduction: 4_400_000,
    insurance: {
      socialRate: 0.08,        // 8%
      healthRate: 0.015,       // 1.5%
      unemploymentRate: 0.01,  // 1%
      totalRate: 0.105,        // 10.5%
      cap: 36_000_000,         // 36 triệu
    },
    taxBrackets: [
      { from: 0, to: 5_000_000, rate: 0.05, label: 'Bậc 1' },
      { from: 5_000_000, to: 10_000_000, rate: 0.10, label: 'Bậc 2' },
      { from: 10_000_000, to: 18_000_000, rate: 0.15, label: 'Bậc 3' },
      { from: 18_000_000, to: 32_000_000, rate: 0.20, label: 'Bậc 4' },
      { from: 32_000_000, to: 52_000_000, rate: 0.25, label: 'Bậc 5' },
      { from: 52_000_000, to: 80_000_000, rate: 0.30, label: 'Bậc 6' },
      { from: 80_000_000, to: Infinity, rate: 0.35, label: 'Bậc 7' },
    ],
  },

  from2026: {
    id: 'from2026',
    name: 'Luật thuế mới',
    effectiveFrom: '2026-01-01',
    description: 'Áp dụng từ 01/01/2026',
    personalDeduction: 15_000_000,
    dependentDeduction: 6_200_000,
    insurance: {
      socialRate: 0.08,
      healthRate: 0.015,
      unemploymentRate: 0.01,
      totalRate: 0.105,
      cap: 36_000_000,
    },
    taxBrackets: [
      { from: 0, to: 5_000_000, rate: 0.05, label: 'Bậc 1' },
      { from: 5_000_000, to: 10_000_000, rate: 0.10, label: 'Bậc 2' },
      { from: 10_000_000, to: 18_000_000, rate: 0.20, label: 'Bậc 3' },
      { from: 18_000_000, to: 32_000_000, rate: 0.30, label: 'Bậc 4' },
      { from: 32_000_000, to: Infinity, rate: 0.35, label: 'Bậc 5' },
    ],
  },
};

// ============================================
// REGIONAL MINIMUM WAGE (2025)
// ============================================

export const REGIONAL_MINIMUM_WAGE: Record<RegionId, RegionalWage> = {
  region1: {
    value: 4_960_000,
    label: 'Vùng I - 4,960,000đ',
  },
  region2: {
    value: 4_410_000,
    label: 'Vùng II - 4,410,000đ',
  },
  region3: {
    value: 3_860_000,
    label: 'Vùng III - 3,860,000đ',
  },
  region4: {
    value: 3_450_000,
    label: 'Vùng IV - 3,450,000đ',
  },
};

export function getTaxLaw(id: string): TaxLaw {
  return TAX_LAWS[id] || TAX_LAWS.from2026;
}

