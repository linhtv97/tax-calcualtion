'use client';

import { useState, useEffect } from 'react';
import { CalculationInput, TaxLawId, InsuranceOption, CalculationMode, RegionId } from '@/types';
import { calculate } from '@/lib/taxCalculator';
import { DEFAULT_VALUES } from '@/lib/constants';
import { TaxLawSelector } from '@/components/TaxLawSelector';
import { CalculationModeToggle } from '@/components/CalculationModeToggle';
import { SalaryInput } from '@/components/SalaryInput';
import { DependentsInput } from '@/components/DependentsInput';
import { InsuranceOptions } from '@/components/InsuranceOptions';
import { ResultCard } from '@/components/ResultCard';
import { TaxBracketTable } from '@/components/TaxBracketTable';
import { TaxRatesModal } from '@/components/TaxRatesModal';
import { Calculator, Copy, Check, FileText } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';

export default function Home() {
  const [taxLawId, setTaxLawId] = useState<TaxLawId>(DEFAULT_VALUES.taxLawId);
  const [mode, setMode] = useState<CalculationMode>(DEFAULT_VALUES.mode);
  const [salary, setSalary] = useState<number>(DEFAULT_VALUES.salary);
  const [dependents, setDependents] = useState<number>(DEFAULT_VALUES.dependents);
  const [insuranceOption, setInsuranceOption] = useState<InsuranceOption>(DEFAULT_VALUES.insuranceOption);
  const [region, setRegion] = useState<RegionId>(DEFAULT_VALUES.region);
  const [customBase, setCustomBase] = useState<number>(DEFAULT_VALUES.salary);
  const [copied, setCopied] = useState(false);
  const [showTaxRates, setShowTaxRates] = useState(false);

  // Calculate result
  const input: CalculationInput = {
    salary,
    dependents,
    taxLawId,
    mode,
    insuranceOption,
    region,
    insuranceBase: customBase,
  };

  const result = calculate(input);

  // Copy result to clipboard
  const handleCopy = () => {
    const text = `
🇻🇳 TÍNH THUẾ THU NHẬP CÁ NHÂN

💵 Lương Gross: ${formatCurrency(result.grossSalary)}

📉 Các khoản trừ:
  - BHXH (8%): ${formatCurrency(result.insurance.social)}
  - BHYT (1.5%): ${formatCurrency(result.insurance.health)}
  - BHTN (1%): ${formatCurrency(result.insurance.unemployment)}
  - Tổng bảo hiểm: ${formatCurrency(result.insurance.total)}

Thu nhập trước thuế: ${formatCurrency(result.incomeBeforeTax)}

📋 Giảm trừ gia cảnh:
  - Bản thân: ${formatCurrency(result.deductions.personal)}
  - Người phụ thuộc: ${formatCurrency(result.deductions.dependents)}
  - Tổng: ${formatCurrency(result.deductions.total)}

Thu nhập tính thuế: ${formatCurrency(result.taxableIncome)}

🧾 Thuế TNCN: ${formatCurrency(result.tax.amount)}

💰 LƯƠNG THỰC LÃNH (NET): ${formatCurrency(result.netSalary)}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('taxCalculation');
      if (saved) {
        const data = JSON.parse(saved);
        setTaxLawId(data.taxLawId || DEFAULT_VALUES.taxLawId);
        setMode(data.mode || DEFAULT_VALUES.mode);
        setSalary(data.salary || DEFAULT_VALUES.salary);
        setDependents(data.dependents || DEFAULT_VALUES.dependents);
        setInsuranceOption(data.insuranceOption || DEFAULT_VALUES.insuranceOption);
        setRegion(data.region || DEFAULT_VALUES.region);
        setCustomBase(data.customBase || DEFAULT_VALUES.salary);
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(
        'taxCalculation',
        JSON.stringify({
          taxLawId,
          mode,
          salary,
          dependents,
          insuranceOption,
          region,
          customBase,
        })
      );
    } catch (e) {
      // Ignore
    }
  }, [taxLawId, mode, salary, dependents, insuranceOption, region, customBase]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Calculator className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Tính Thuế Thu Nhập Cá Nhân
                </h1>
                <p className="text-sm text-gray-600">
                  Chuyển đổi Gross ⇄ Net dễ dàng • 100% miễn phí
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowTaxRates(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-sm"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Xem biểu thuế</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tax Rates Modal */}
      <TaxRatesModal isOpen={showTaxRates} onClose={() => setShowTaxRates(false)} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column - Input */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
              <h2 className="text-lg font-bold text-gray-900">📝 Thông tin đầu vào</h2>

              <TaxLawSelector value={taxLawId} onChange={setTaxLawId} />

              <div className="border-t border-gray-200 pt-4">
                <CalculationModeToggle value={mode} onChange={setMode} />
              </div>

              <SalaryInput value={salary} onChange={setSalary} mode={mode} />

              <DependentsInput value={dependents} onChange={setDependents} />

              <InsuranceOptions
                option={insuranceOption}
                onOptionChange={setInsuranceOption}
                region={region}
                onRegionChange={setRegion}
                customBase={customBase}
                onCustomBaseChange={setCustomBase}
                taxLawId={taxLawId}
              />
            </div>
          </div>

          {/* Right Column - Result */}
          <div className="space-y-4">
            <ResultCard result={result} mode={mode} inputSalary={salary} />

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors text-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Đã copy!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy kết quả
                </>
              )}
            </button>

            <TaxBracketTable taxLawId={taxLawId} taxableIncome={result.taxableIncome} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pb-6 text-center text-xs text-gray-500">
          <div className="max-w-2xl mx-auto space-y-1">
            <p>
              ⚠️ <strong>Lưu ý:</strong> Công cụ này chỉ mang tính chất tham khảo.
            </p>
            <p>
              Dữ liệu không được lưu trữ trên server • 100% Frontend
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

