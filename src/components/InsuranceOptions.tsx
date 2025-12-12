import { InsuranceOption, RegionId } from '../types';
import { REGIONAL_MINIMUM_WAGE } from '../lib/taxLaws';
import { formatNumber, parseCurrency } from '../lib/formatters';
import { Tooltip } from './Tooltip';
import { EXPLANATIONS } from '../lib/constants';

interface InsuranceOptionsProps {
  option: InsuranceOption;
  onOptionChange: (option: InsuranceOption) => void;
  region: RegionId;
  onRegionChange: (region: RegionId) => void;
  customBase: number;
  onCustomBaseChange: (base: number) => void;
}

export function InsuranceOptions({
  option,
  onOptionChange,
  region,
  onRegionChange,
  customBase,
  onCustomBaseChange,
}: InsuranceOptionsProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
        💼 Đóng bảo hiểm
        <Tooltip
          title={EXPLANATIONS.insuranceBase.title}
          content={EXPLANATIONS.insuranceBase.content}
        />
      </label>

      <div className="space-y-2">
        {/* Option 1: Full */}
        <label className="flex items-start gap-2 p-2 border-2 rounded cursor-pointer transition-all hover:border-primary-300"
          style={{
            borderColor: option === 'full' ? '#0ea5e9' : '#e5e7eb',
            backgroundColor: option === 'full' ? '#f0f9ff' : 'white',
          }}
        >
            <input
              type="radio"
              name="insurance"
              value="full"
              checked={option === 'full'}
              onChange={(e) => onOptionChange(e.target.value as InsuranceOption)}
              className="mt-0.5 w-3.5 h-3.5 text-primary-600"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Đóng full trên lương</div>
              <div className="text-xs text-gray-500">
                Đóng theo lương thực tế (tối đa 36 triệu)
              </div>
            </div>
          </label>

        {/* Option 2: Minimum */}
        <label className="flex items-start gap-2 p-2 border-2 rounded cursor-pointer transition-all hover:border-primary-300"
          style={{
            borderColor: option === 'minimum' ? '#0ea5e9' : '#e5e7eb',
            backgroundColor: option === 'minimum' ? '#f0f9ff' : 'white',
          }}
        >
            <input
              type="radio"
              name="insurance"
              value="minimum"
              checked={option === 'minimum'}
              onChange={(e) => onOptionChange(e.target.value as InsuranceOption)}
              className="mt-0.5 w-3.5 h-3.5 text-primary-600"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Đóng tối thiểu vùng</div>
              <div className="text-xs text-gray-500">
                Đóng theo mức tối thiểu vùng
              </div>
              {option === 'minimum' && (
                <select
                  value={region}
                  onChange={(e) => onRegionChange(e.target.value as RegionId)}
                  className="mt-1.5 w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:border-primary-500 outline-none"
                >
                  {Object.entries(REGIONAL_MINIMUM_WAGE).map(([key, wage]) => (
                    <option key={key} value={key}>
                      {wage.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </label>

        {/* Option 3: Custom */}
        <label className="flex items-start gap-2 p-2 border-2 rounded cursor-pointer transition-all hover:border-primary-300"
          style={{
            borderColor: option === 'custom' ? '#0ea5e9' : '#e5e7eb',
            backgroundColor: option === 'custom' ? '#f0f9ff' : 'white',
          }}
        >
            <input
              type="radio"
              name="insurance"
              value="custom"
              checked={option === 'custom'}
              onChange={(e) => onOptionChange(e.target.value as InsuranceOption)}
              className="mt-0.5 w-3.5 h-3.5 text-primary-600"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Tự nhập mức</div>
              <div className="text-xs text-gray-500">
                Nhập mức lương đóng bảo hiểm (tối đa 36 triệu)
              </div>
              {option === 'custom' && (
                <input
                  type="text"
                  value={customBase > 0 ? formatNumber(customBase) : ''}
                  onChange={(e) => onCustomBaseChange(parseCurrency(e.target.value))}
                  placeholder="20,000,000"
                  className="mt-1.5 w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:border-primary-500 outline-none"
                />
              )}
            </div>
          </label>
      </div>
    </div>
  );
}

