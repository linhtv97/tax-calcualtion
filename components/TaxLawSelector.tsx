'use client';

import { TaxLawId } from '@/types';
import { TAX_LAWS } from '@/lib/taxLaws';

interface TaxLawSelectorProps {
  value: TaxLawId;
  onChange: (value: TaxLawId) => void;
}

export function TaxLawSelector({ value, onChange }: TaxLawSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-700">
        ⚖️ Luật thuế áp dụng
      </label>
      <div className="flex flex-col gap-2">
        {Object.values(TAX_LAWS).map((law) => (
          <label
            key={law.id}
            className="flex items-center gap-2 p-2 border-2 rounded cursor-pointer transition-all hover:border-primary-300"
            style={{
              borderColor: value === law.id ? '#0ea5e9' : '#e5e7eb',
              backgroundColor: value === law.id ? '#f0f9ff' : 'white',
            }}
          >
            <input
              type="radio"
              name="taxLaw"
              value={law.id}
              checked={value === law.id}
              onChange={(e) => onChange(e.target.value as TaxLawId)}
              className="w-3.5 h-3.5 text-primary-600 focus:ring-primary-500"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                {law.name}
                {law.id === 'from2026' && (
                  <span className="ml-1.5 text-xs px-1.5 py-0.5 bg-primary-100 text-primary-700 rounded-full">
                    ✨ Mới
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500">
                {law.description}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

