'use client';

import { TaxLawId } from '@/types';
import { getTaxLaw } from '@/lib/taxLaws';
import { formatCurrency, formatPercentage } from '@/lib/formatters';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface TaxBracketTableProps {
  taxLawId: TaxLawId;
  taxableIncome: number;
}

export function TaxBracketTable({ taxLawId, taxableIncome }: TaxBracketTableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const law = getTaxLaw(taxLawId);

  // Determine which brackets are active
  const isActiveBracket = (bracketFrom: number) => {
    return taxableIncome > bracketFrom;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-lg"
      >
        <h3 className="text-sm font-semibold text-gray-900">
          📚 Biểu thuế lũy tiến ({law.name})
        </h3>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="p-3 border-t border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">
                    Bậc
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">
                    Thu nhập tính thuế/tháng
                  </th>
                  <th className="px-3 py-2 text-right font-semibold text-gray-700">
                    Thuế suất
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {law.taxBrackets.map((bracket, index) => {
                  const isActive = isActiveBracket(bracket.from);
                  return (
                    <tr 
                      key={index} 
                      className={`${
                        isActive 
                          ? 'bg-primary-50 hover:bg-primary-100' 
                          : 'opacity-40 hover:opacity-60'
                      } transition-all`}
                    >
                      <td className={`px-3 py-2 font-medium ${isActive ? 'text-primary-900' : 'text-gray-600'}`}>
                        {bracket.label}
                      </td>
                      <td className={`px-3 py-2 ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                        {bracket.from === 0 ? (
                          <>Đến {formatCurrency(bracket.to)}</>
                        ) : bracket.to === Infinity ? (
                          <>Trên {formatCurrency(bracket.from)}</>
                        ) : (
                          <>
                            {formatCurrency(bracket.from)} - {formatCurrency(bracket.to)}
                          </>
                        )}
                      </td>
                      <td className={`px-3 py-2 text-right font-semibold ${
                        isActive ? 'text-primary-600' : 'text-gray-500'
                      }`}>
                        {formatPercentage(bracket.rate * 100, 0)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-gray-600">
            <strong>Lưu ý:</strong> Các bậc được tô sáng là bậc thuế bạn phải đóng.
            Thuế lũy tiến từng phần nghĩa là mỗi phần thu nhập chịu thuế suất của bậc tương ứng.
          </div>
        </div>
      )}
    </div>
  );
}

