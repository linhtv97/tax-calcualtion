'use client';

import { formatNumber, parseCurrency } from '@/lib/formatters';
import { CalculationMode } from '@/types';

interface SalaryInputProps {
  value: number;
  onChange: (value: number) => void;
  mode: CalculationMode;
}

export function SalaryInput({ value, onChange, mode }: SalaryInputProps) {
  const label = mode === 'grossToNet' ? '💵 Lương Gross' : '💰 Lương Net mong muốn';
  const placeholder = '20,000,000';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseCurrency(e.target.value);
    onChange(parsed);
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={value > 0 ? formatNumber(value) : ''}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 text-base border-2 border-gray-300 rounded focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
          đ/tháng
        </div>
      </div>
      <p className="text-xs text-gray-500">
        {mode === 'grossToNet'
          ? 'Lương trên hợp đồng (chưa trừ thuế & bảo hiểm)'
          : 'Lương thực lãnh mong muốn (sau khi trừ thuế & bảo hiểm)'}
      </p>
    </div>
  );
}

