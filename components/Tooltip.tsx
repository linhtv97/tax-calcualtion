'use client';

import { Info } from 'lucide-react';
import { useState } from 'react';

interface TooltipProps {
  title: string;
  content: string;
}

export function Tooltip({ title, content }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="inline-flex items-center justify-center w-5 h-5 text-primary-600 hover:text-primary-700 transition-colors"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Info className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-72 p-4 bg-white border border-gray-200 rounded-lg shadow-xl bottom-full left-1/2 -translate-x-1/2 mb-2 md:left-auto md:right-0 md:translate-x-0">
          <div className="text-sm">
            <div className="font-semibold text-gray-900 mb-2">{title}</div>
            <div className="text-gray-600 whitespace-pre-line">{content}</div>
          </div>
          {/* Arrow */}
          <div className="absolute w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45 -bottom-1.5 left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0" />
        </div>
      )}
    </div>
  );
}

