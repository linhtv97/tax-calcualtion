import { CalculationMode } from '../types';

interface CalculationModeToggleProps {
  value: CalculationMode;
  onChange: (value: CalculationMode) => void;
}

export function CalculationModeToggle({ value, onChange }: CalculationModeToggleProps) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-700">
        Tính từ
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange('grossToNet')}
          className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-all ${
            value === 'grossToNet'
              ? 'bg-primary-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Gross → Net
        </button>
        <button
          type="button"
          onClick={() => onChange('netToGross')}
          className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-all ${
            value === 'netToGross'
              ? 'bg-primary-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Net → Gross
        </button>
      </div>
    </div>
  );
}

