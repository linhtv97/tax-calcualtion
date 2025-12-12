'use client';

import { Minus, Plus } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { EXPLANATIONS } from '@/lib/constants';

interface DependentsInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function DependentsInput({ value, onChange }: DependentsInputProps) {
  const handleIncrement = () => {
    if (value < 20) onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > 0) onChange(value - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 0 && val <= 20) {
      onChange(val);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
        👨‍👩‍👧 Số người phụ thuộc
        <Tooltip
          title={EXPLANATIONS.dependentDeduction.title}
          content={EXPLANATIONS.dependentDeduction.content}
        />
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value === 0}
          className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <input
          type="number"
          value={value}
          onChange={handleChange}
          min="0"
          max="20"
          className="flex-1 text-center text-xl font-bold py-2 border-2 border-gray-300 rounded focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
        />
        <button
          type="button"
          onClick={handleIncrement}
          disabled={value === 20}
          className="w-10 h-10 flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-gray-500">
        Con dưới 18 tuổi, cha mẹ già, vợ/chồng không có thu nhập...
      </p>
    </div>
  );
}

