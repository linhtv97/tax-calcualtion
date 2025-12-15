'use client';

import { X, FileText } from 'lucide-react';
import { useEffect } from 'react';

interface TaxRatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TaxRatesModal({ isOpen, onClose }: TaxRatesModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-bold text-gray-900">
              📊 Biểu Thuế Thu Nhập Cá Nhân Việt Nam
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 prose prose-sm max-w-none">
          {/* Luật cũ */}
          <section className="mb-8">
            <h3 className="text-lg font-bold text-red-600 mb-4">🔴 Luật Hiện Hành (Đến hết 2025)</h3>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Giảm trừ gia cảnh</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Bản thân:</strong> 11,000,000 đ/tháng</li>
                <li><strong>Người phụ thuộc:</strong> 4,400,000 đ/người/tháng</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Biểu thuế lũy tiến (7 bậc)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2">Bậc</th>
                      <th className="border border-gray-300 px-3 py-2">Thu nhập tính thuế/tháng</th>
                      <th className="border border-gray-300 px-3 py-2">Thuế suất</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-gray-300 px-3 py-2 text-center">1</td><td className="border border-gray-300 px-3 py-2">Đến 5,000,000 đ</td><td className="border border-gray-300 px-3 py-2 text-center font-semibold text-primary-600">5%</td></tr>
                    <tr><td className="border border-gray-300 px-3 py-2 text-center">2</td><td className="border border-gray-300 px-3 py-2">Trên 5,000,000 - 10,000,000 đ</td><td className="border border-gray-300 px-3 py-2 text-center font-semibold text-primary-600">10%</td></tr>
                    <tr><td className="border border-gray-300 px-3 py-2 text-center">3</td><td className="border border-gray-300 px-3 py-2">Trên 10,000,000 - 18,000,000 đ</td><td className="border border-gray-300 px-3 py-2 text-center font-semibold text-primary-600">15%</td></tr>
                    <tr><td className="border border-gray-300 px-3 py-2 text-center">4</td><td className="border border-gray-300 px-3 py-2">Trên 18,000,000 - 32,000,000 đ</td><td className="border border-gray-300 px-3 py-2 text-center font-semibold text-primary-600">20%</td></tr>
                    <tr><td className="border border-gray-300 px-3 py-2 text-center">5</td><td className="border border-gray-300 px-3 py-2">Trên 32,000,000 - 52,000,000 đ</td><td className="border border-gray-300 px-3 py-2 text-center font-semibold text-primary-600">25%</td></tr>
                    <tr><td className="border border-gray-300 px-3 py-2 text-center">6</td><td className="border border-gray-300 px-3 py-2">Trên 52,000,000 - 80,000,000 đ</td><td className="border border-gray-300 px-3 py-2 text-center font-semibold text-primary-600">30%</td></tr>
                    <tr><td className="border border-gray-300 px-3 py-2 text-center">7</td><td className="border border-gray-300 px-3 py-2">Trên 80,000,000 đ</td><td className="border border-gray-300 px-3 py-2 text-center font-semibold text-primary-600">35%</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <hr className="my-8 border-gray-300" />

          {/* Luật mới */}
          <section className="mb-8">
            <h3 className="text-lg font-bold text-green-600 mb-4">🟢 Luật Mới (Từ 01/01/2026)</h3>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Giảm trừ gia cảnh (↑ Tăng)</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Bản thân:</strong> 15,000,000 đ/tháng <span className="text-green-600">(+4 triệu)</span></li>
                <li><strong>Người phụ thuộc:</strong> 6,200,000 đ/người/tháng <span className="text-green-600">(+1.8 triệu)</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Biểu thuế lũy tiến (5 bậc - Đơn giản hóa)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2">Bậc</th>
                      <th className="border border-gray-300 px-3 py-2">Thu nhập tính thuế/tháng</th>
                      <th className="border border-gray-300 px-3 py-2">Thu nhập/năm</th>
                      <th className="border border-gray-300 px-3 py-2">Thuế suất</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-gray-300 px-3 py-2 text-center">1</td><td className="border border-gray-300 px-3 py-2">Đến 10,000,000 đ</td><td className="border border-gray-300 px-3 py-2">Đến 120 triệu</td><td className="border border-gray-300 px-3 py-2 text-center font-semibold text-green-600">5%</td></tr>
                    <tr><td className="border border-gray-300 px-3 py-2 text-center">2</td><td className="border border-gray-300 px-3 py-2">Trên 10,000,000 - 30,000,000 đ</td><td className="border border-gray-300 px-3 py-2">120 - 360 triệu</td><td className="border border-gray-300 px-3 py-2 text-center font-semibold text-green-600">10%</td></tr>
                    <tr><td className="border border-gray-300 px-3 py-2 text-center">3</td><td className="border border-gray-300 px-3 py-2">Trên 30,000,000 - 60,000,000 đ</td><td className="border border-gray-300 px-3 py-2">360 - 720 triệu</td><td className="border border-gray-300 px-3 py-2 text-center font-semibold text-green-600">20%</td></tr>
                    <tr><td className="border border-gray-300 px-3 py-2 text-center">4</td><td className="border border-gray-300 px-3 py-2">Trên 60,000,000 - 100,000,000 đ</td><td className="border border-gray-300 px-3 py-2">720 triệu - 1.2 tỷ</td><td className="border border-gray-300 px-3 py-2 text-center font-semibold text-green-600">30%</td></tr>
                    <tr><td className="border border-gray-300 px-3 py-2 text-center">5</td><td className="border border-gray-300 px-3 py-2">Trên 100,000,000 đ</td><td className="border border-gray-300 px-3 py-2">Trên 1.2 tỷ</td><td className="border border-gray-300 px-3 py-2 text-center font-semibold text-green-600">35%</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <hr className="my-8 border-gray-300" />

          {/* Bảo hiểm */}
          <section className="mb-8">
            <h3 className="text-lg font-bold text-blue-600 mb-4">💼 Bảo Hiểm (Không đổi cả 2 luật)</h3>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Tỷ lệ đóng (người lao động)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2">Loại</th>
                      <th className="border border-gray-300 px-3 py-2">Tỷ lệ</th>
                      <th className="border border-gray-300 px-3 py-2">Trần đóng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-gray-300 px-3 py-2">BHXH</td><td className="border border-gray-300 px-3 py-2 text-center">8%</td><td className="border border-gray-300 px-3 py-2">46,800,000 đ (20 × 2.34 triệu)</td></tr>
                    <tr><td className="border border-gray-300 px-3 py-2">BHYT</td><td className="border border-gray-300 px-3 py-2 text-center">1.5%</td><td className="border border-gray-300 px-3 py-2">46,800,000 đ (20 × 2.34 triệu)</td></tr>
                    <tr><td className="border border-gray-300 px-3 py-2">BHTN</td><td className="border border-gray-300 px-3 py-2 text-center">1%</td><td className="border border-gray-300 px-3 py-2">Theo lương tối thiểu vùng</td></tr>
                    <tr><td className="border border-gray-300 px-3 py-2 font-bold">Tổng</td><td className="border border-gray-300 px-3 py-2 text-center font-bold">10.5%</td><td className="border border-gray-300 px-3 py-2 font-bold">46,800,000 đ</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Lương tối thiểu vùng</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-700 mb-2">Năm 2025:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Vùng I: 4,960,000 đ</li>
                    <li>Vùng II: 4,410,000 đ</li>
                    <li>Vùng III: 3,860,000 đ</li>
                    <li>Vùng IV: 3,450,000 đ</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-2">Từ 01/01/2026 (tăng 7.2%):</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Vùng I: 5,310,000 đ <span className="text-green-600">(+350k)</span></li>
                    <li>Vùng II: 4,730,000 đ <span className="text-green-600">(+320k)</span></li>
                    <li>Vùng III: 4,140,000 đ <span className="text-green-600">(+280k)</span></li>
                    <li>Vùng IV: 3,700,000 đ <span className="text-green-600">(+250k)</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <hr className="my-8 border-gray-300" />

          {/* Công thức */}
          <section className="mb-8">
            <h3 className="text-lg font-bold text-purple-600 mb-4">📐 Công Thức Tính</h3>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm space-y-2">
              <p>1. Thu nhập trước thuế = Lương Gross - Bảo hiểm (10.5%)</p>
              <p>2. Thu nhập tính thuế = Thu nhập trước thuế - Giảm trừ gia cảnh</p>
              <p>3. Thuế TNCN = Áp dụng biểu thuế lũy tiến</p>
              <p>4. Lương NET = Lương Gross - Bảo hiểm - Thuế TNCN</p>
            </div>
          </section>

          {/* Lưu ý */}
          <section>
            <h3 className="text-lg font-bold text-orange-600 mb-4">📌 Lưu Ý</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Thuế lũy tiến từng phần: mỗi phần thu nhập chịu thuế suất của bậc tương ứng</li>
              <li>Luật mới có lợi hơn cho hầu hết người lao động nhờ:
                <ul className="list-circle pl-5 mt-1">
                  <li>Giảm trừ gia cảnh tăng cao</li>
                  <li>Bậc thuế thấp được mở rộng đáng kể</li>
                </ul>
              </li>
            </ul>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-200 text-xs text-gray-500 text-center">
            <p><strong>Nguồn:</strong> Luật Thuế TNCN số 04/2007/QH12 và Luật sửa đổi số 67/2024/QH15</p>
          </div>
        </div>
      </div>
    </div>
  );
}

