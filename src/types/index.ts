// ============================================
// TYPE DEFINITIONS
// ============================================

export type TaxLawId = 'before2026' | 'from2026';
export type InsuranceOption = 'full' | 'minimum' | 'custom';
export type CalculationMode = 'grossToNet' | 'netToGross';
export type RegionId = 'region1' | 'region2' | 'region3' | 'region4';

export interface TaxBracket {
  from: number;
  to: number;
  rate: number;
  label: string;
}

export interface InsuranceRates {
  socialRate: number;
  healthRate: number;
  unemploymentRate: number;
  totalRate: number;
  cap: number;
}

export interface TaxLaw {
  id: TaxLawId;
  name: string;
  effectiveFrom: string;
  description: string;
  personalDeduction: number;
  dependentDeduction: number;
  insurance: InsuranceRates;
  taxBrackets: TaxBracket[];
}

export interface CalculationInput {
  salary: number;
  dependents: number;
  taxLawId: TaxLawId;
  mode: CalculationMode;
  insuranceOption: InsuranceOption;
  insuranceBase?: number;
  region?: RegionId;
}

export interface TaxBreakdownItem {
  bracket: string;
  from: number;
  to: number;
  rate: number;
  taxableAmount: number;
  tax: number;
}

export interface InsuranceBreakdown {
  base: number;
  social: number;
  health: number;
  unemployment: number;
  total: number;
}

export interface DeductionsBreakdown {
  personal: number;
  dependents: number;
  total: number;
}

export interface TaxBreakdown {
  amount: number;
  breakdown: TaxBreakdownItem[];
}

export interface CalculationResult {
  grossSalary: number;
  netSalary: number;
  insurance: InsuranceBreakdown;
  incomeBeforeTax: number;
  deductions: DeductionsBreakdown;
  taxableIncome: number;
  tax: TaxBreakdown;
  effectiveTaxRate: number;
  takeHomePercentage: number;
}

export interface RegionalWage {
  value: number;
  label: string;
}

