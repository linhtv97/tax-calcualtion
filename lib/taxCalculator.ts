import {
  CalculationInput,
  CalculationResult,
  TaxBracket,
  TaxBreakdownItem,
} from '@/types';
import { getTaxLaw } from './taxLaws';
import { REGIONAL_MINIMUM_WAGE } from './taxLaws';

// ============================================
// TAX CALCULATOR - CORE LOGIC
// ============================================

/**
 * Main calculation function - routes to appropriate calculator
 */
export function calculate(input: CalculationInput): CalculationResult {
  if (input.mode === 'grossToNet') {
    return calculateNetFromGross(input);
  } else {
    return calculateGrossFromNet(input);
  }
}

/**
 * Calculate NET salary from GROSS salary
 */
export function calculateNetFromGross(input: CalculationInput): CalculationResult {
  const law = getTaxLaw(input.taxLawId);
  const grossSalary = input.salary;

  // 1. Calculate insurance base
  const insuranceBase = getInsuranceBase(input);

  // 2. Calculate insurance contributions
  const insurance = {
    base: insuranceBase,
    social: insuranceBase * law.insurance.socialRate,
    health: insuranceBase * law.insurance.healthRate,
    unemployment: insuranceBase * law.insurance.unemploymentRate,
    total: insuranceBase * law.insurance.totalRate,
  };

  // 3. Income before tax
  const incomeBeforeTax = grossSalary - insurance.total;

  // 4. Deductions (personal + dependents)
  const deductions = {
    personal: law.personalDeduction,
    dependents: law.dependentDeduction * input.dependents,
    total: law.personalDeduction + law.dependentDeduction * input.dependents,
  };

  // 5. Taxable income
  const taxableIncome = Math.max(0, incomeBeforeTax - deductions.total);

  // 6. Calculate progressive tax
  const taxResult = calculateProgressiveTax(taxableIncome, law.taxBrackets);

  // 7. Net salary
  const netSalary = grossSalary - insurance.total - taxResult.amount;

  // 8. Calculate effective rates
  const effectiveTaxRate =
    grossSalary > 0 ? (taxResult.amount / grossSalary) * 100 : 0;
  const takeHomePercentage = grossSalary > 0 ? (netSalary / grossSalary) * 100 : 0;

  return {
    grossSalary,
    netSalary,
    insurance,
    incomeBeforeTax,
    deductions,
    taxableIncome,
    tax: taxResult,
    effectiveTaxRate,
    takeHomePercentage,
  };
}

/**
 * Calculate GROSS salary from desired NET salary
 * Uses binary search algorithm to find the gross salary
 */
export function calculateGrossFromNet(input: CalculationInput): CalculationResult {
  const targetNet = input.salary;

  // Binary search bounds
  let low = targetNet;
  let high = targetNet * 3; // Upper bound (conservative)
  let iterations = 0;
  const maxIterations = 100;
  const tolerance = 1000; // Accept ±1000đ difference

  while (iterations < maxIterations) {
    const mid = (low + high) / 2;

    // Calculate net from this gross guess
    const result = calculateNetFromGross({
      ...input,
      salary: mid,
    });

    const diff = result.netSalary - targetNet;

    // Found close enough match
    if (Math.abs(diff) < tolerance) {
      return result;
    }

    // Adjust search bounds
    if (result.netSalary < targetNet) {
      low = mid;
    } else {
      high = mid;
    }

    iterations++;
  }

  // Fallback: return best guess
  return calculateNetFromGross({
    ...input,
    salary: (low + high) / 2,
  });
}

/**
 * Helper: Get insurance base amount based on user's choice
 */
function getInsuranceBase(input: CalculationInput): number {
  const law = getTaxLaw(input.taxLawId);

  switch (input.insuranceOption) {
    case 'full':
      // Full salary up to cap
      return Math.min(input.salary, law.insurance.cap);

    case 'minimum':
      // Regional minimum wage
      const region = input.region || 'region1';
      return REGIONAL_MINIMUM_WAGE[region].value;

    case 'custom':
      // Custom amount (capped)
      return Math.min(input.insuranceBase || 0, law.insurance.cap);

    default:
      return Math.min(input.salary, law.insurance.cap);
  }
}

/**
 * Helper: Calculate progressive tax
 */
function calculateProgressiveTax(
  taxableIncome: number,
  brackets: TaxBracket[]
) {
  let totalTax = 0;
  const breakdown: TaxBreakdownItem[] = [];

  if (taxableIncome <= 0) {
    return {
      amount: 0,
      breakdown: [],
    };
  }

  for (const bracket of brackets) {
    // Skip if income doesn't reach this bracket
    if (taxableIncome <= bracket.from) {
      break;
    }

    // Calculate taxable amount in this bracket
    const taxableInBracket = Math.min(
      taxableIncome - bracket.from,
      bracket.to - bracket.from
    );

    // Calculate tax for this bracket
    const tax = taxableInBracket * bracket.rate;
    totalTax += tax;

    // Add to breakdown
    breakdown.push({
      bracket: bracket.label,
      from: bracket.from,
      to: bracket.to === Infinity ? bracket.to : bracket.to,
      rate: bracket.rate,
      taxableAmount: taxableInBracket,
      tax,
    });

    // Stop if we've reached infinity bracket
    if (bracket.to === Infinity) {
      break;
    }
  }

  return {
    amount: Math.round(totalTax),
    breakdown,
  };
}

/**
 * Helper: Compare two tax laws side by side
 */
export function compareTaxLaws(input: Omit<CalculationInput, 'taxLawId'>) {
  const before2026 = calculateNetFromGross({
    ...input,
    taxLawId: 'before2026',
  });

  const from2026 = calculateNetFromGross({
    ...input,
    taxLawId: 'from2026',
  });

  return {
    before2026,
    from2026,
    difference: {
      netSalary: from2026.netSalary - before2026.netSalary,
      tax: from2026.tax.amount - before2026.tax.amount,
      deductions: from2026.deductions.total - before2026.deductions.total,
    },
  };
}

