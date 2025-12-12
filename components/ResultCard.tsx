'use client';

import { CalculationResult } from '@/types';
import { formatCurrency, formatPercentage } from '@/lib/formatters';
import { Tooltip } from './Tooltip';
import { EXPLANATIONS } from '@/lib/constants';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface ResultCardProps {
  result: CalculationResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const [showInsuranceDetail, setShowInsuranceDetail] = useState(false);
  const [showDeductionDetail, setShowDeductionDetail] = useState(false);
  const [showTaxDetail, setShowTaxDetail] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
      <h2 className="text-lg font-bold text-gray-900">📊 Kết quả chi tiết</h2>

      {/* Gross Salary */}
      <div className="space-y-1">
        <div className="text-xs text-gray-600">💵 Lương Gross</div>
        <div className="text-xl font-bold text-gray-900">
          {formatCurrency(result.grossSalary)}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-3 space-y-3">
        {/* Insurance */}
        <div>
          <button
            onClick={() => setShowInsuranceDetail(!showInsuranceDetail)}
            className="w-full flex items-center justify-between p-2.5 bg-red-50 rounded hover:bg-red-100 transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-gray-700">
                📉 Bảo hiểm (10.5%)
              </span>
              <Tooltip
                title="Bảo hiểm bắt buộc"
                content="Tổng các khoản bảo hiểm: BHXH (8%) + BHYT (1.5%) + BHTN (1%)"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-red-600">
                -{formatCurrency(result.insurance.total)}
              </span>
              {showInsuranceDetail ? (
                <ChevronUp className="w-3.5 h-3.5 text-gray-500" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              )}
            </div>
          </button>

          {showInsuranceDetail && (
            <div className="mt-1.5 ml-3 space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span className="text-gray-600">BHXH (8%)</span>
                  <Tooltip
                    title={EXPLANATIONS.socialInsurance.title}
                    content={EXPLANATIONS.socialInsurance.content}
                  />
                </div>
                <span className="font-medium text-gray-900">
                  -{formatCurrency(result.insurance.social)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span className="text-gray-600">BHYT (1.5%)</span>
                  <Tooltip
                    title={EXPLANATIONS.healthInsurance.title}
                    content={EXPLANATIONS.healthInsurance.content}
                  />
                </div>
                <span className="font-medium text-gray-900">
                  -{formatCurrency(result.insurance.health)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span className="text-gray-600">BHTN (1%)</span>
                  <Tooltip
                    title={EXPLANATIONS.unemploymentInsurance.title}
                    content={EXPLANATIONS.unemploymentInsurance.content}
                  />
                </div>
                <span className="font-medium text-gray-900">
                  -{formatCurrency(result.insurance.unemployment)}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1.5 p-1.5 bg-gray-50 rounded">
                Đóng trên mức: {formatCurrency(result.insurance.base)}
              </div>
            </div>
          )}
        </div>

        {/* Income Before Tax */}
        <div className="flex justify-between items-center p-2.5 bg-blue-50 rounded">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-gray-700">
              Thu nhập trước thuế
            </span>
            <Tooltip
              title={EXPLANATIONS.incomeBeforeTax.title}
              content={EXPLANATIONS.incomeBeforeTax.content}
            />
          </div>
          <span className="text-base font-bold text-blue-600">
            {formatCurrency(result.incomeBeforeTax)}
          </span>
        </div>

        {/* Deductions */}
        <div>
          <button
            onClick={() => setShowDeductionDetail(!showDeductionDetail)}
            className="w-full flex items-center justify-between p-2.5 bg-green-50 rounded hover:bg-green-100 transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-gray-700">
                📋 Giảm trừ gia cảnh
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-green-600">
                -{formatCurrency(result.deductions.total)}
              </span>
              {showDeductionDetail ? (
                <ChevronUp className="w-3.5 h-3.5 text-gray-500" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              )}
            </div>
          </button>

          {showDeductionDetail && (
            <div className="mt-1.5 ml-3 space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span className="text-gray-600">Bản thân</span>
                  <Tooltip
                    title={EXPLANATIONS.personalDeduction.title}
                    content={EXPLANATIONS.personalDeduction.content}
                  />
                </div>
                <span className="font-medium text-gray-900">
                  -{formatCurrency(result.deductions.personal)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span className="text-gray-600">Người phụ thuộc</span>
                  <Tooltip
                    title={EXPLANATIONS.dependentDeduction.title}
                    content={EXPLANATIONS.dependentDeduction.content}
                  />
                </div>
                <span className="font-medium text-gray-900">
                  -{formatCurrency(result.deductions.dependents)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Taxable Income */}
        <div className="flex justify-between items-center p-2.5 bg-purple-50 rounded">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-gray-700">
              Thu nhập tính thuế
            </span>
            <Tooltip
              title={EXPLANATIONS.taxableIncome.title}
              content={EXPLANATIONS.taxableIncome.content}
            />
          </div>
          <span className="text-base font-bold text-purple-600">
            {formatCurrency(result.taxableIncome)}
          </span>
        </div>

        {/* Tax */}
        <div>
          <button
            onClick={() => setShowTaxDetail(!showTaxDetail)}
            className="w-full flex items-center justify-between p-2.5 bg-orange-50 rounded hover:bg-orange-100 transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-gray-700">
                🧾 Thuế TNCN
              </span>
              <Tooltip
                title={EXPLANATIONS.taxBracket.title}
                content={EXPLANATIONS.taxBracket.content}
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-orange-600">
                -{formatCurrency(result.tax.amount)}
              </span>
              {result.tax.breakdown.length > 0 && (
                showTaxDetail ? (
                  <ChevronUp className="w-3.5 h-3.5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                )
              )}
            </div>
          </button>

          {showTaxDetail && result.tax.breakdown.length > 0 && (
            <div className="mt-1.5 ml-3 space-y-1.5 text-xs">
              {result.tax.breakdown.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {item.bracket}: {formatCurrency(item.taxableAmount)} × {formatPercentage(item.rate * 100, 0)}
                  </span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(item.tax)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {result.taxableIncome === 0 && (
            <div className="mt-1.5 text-xs text-gray-500 text-center p-1.5 bg-gray-50 rounded">
              Thu nhập không đủ chịu thuế
            </div>
          )}
        </div>
      </div>

      {/* Final Net Salary */}
      <div className="border-t border-gray-300 pt-3">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-4 text-white">
          <div className="text-xs opacity-90 mb-1">💰 Lương thực lãnh (NET)</div>
          <div className="text-3xl font-bold mb-1.5">
            {formatCurrency(result.netSalary)}
          </div>
          <div className="flex gap-3 text-xs opacity-90">
            <span>
              Thuế: {formatPercentage(result.effectiveTaxRate)}
            </span>
            <span>•</span>
            <span>
              Thực lãnh: {formatPercentage(result.takeHomePercentage)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

