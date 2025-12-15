// ============================================
// CONSTANTS & EXPLANATIONS
// ============================================

export const EXPLANATIONS = {
  personalDeduction: {
    title: 'Giảm trừ gia cảnh cho bản thân',
    content: `Đây là khoản giảm trừ thuế cho bản thân người nộp thuế. Phần thu nhập này được miễn thuế.
    
• Trước 2026: 11 triệu đồng/tháng
• Từ 2026: 15.5 triệu đồng/tháng

Căn cứ pháp lý: Luật Thuế TNCN số 67/2024/QH15`,
  },
  
  dependentDeduction: {
    title: 'Giảm trừ cho người phụ thuộc',
    content: `Khoản giảm trừ cho mỗi người phụ thuộc hợp lệ (con dưới 18 tuổi, cha mẹ già, vợ/chồng không có thu nhập...)
    
• Trước 2026: 4.4 triệu đồng/người/tháng
• Từ 2026: 6.2 triệu đồng/người/tháng

Điều kiện: Phải đăng ký người phụ thuộc hợp lệ với cơ quan thuế`,
  },
  
  socialInsurance: {
    title: 'Bảo hiểm xã hội (BHXH)',
    content: `Bảo hiểm xã hội bắt buộc cho người lao động:

• Người lao động đóng: 8%
• Người sử dụng lao động đóng: 17.5%
• Tổng: 25.5%

Mức trần đóng: 46.8 triệu đồng/tháng (20 × 2.34 triệu - năm 2025)

Quyền lợi: Hưu trí, tử tuất, ốm đau, thai sản, tai nạn lao động, bệnh nghề nghiệp`,
  },
  
  healthInsurance: {
    title: 'Bảo hiểm y tế (BHYT)',
    content: `Bảo hiểm y tế bắt buộc:

• Người lao động đóng: 1.5%
• Người sử dụng lao động đóng: 3%
• Tổng: 4.5%

Mức trần đóng: 46.8 triệu đồng/tháng (20 × 2.34 triệu - năm 2025)

Quyền lợi: Khám chữa bệnh tại các cơ sở y tế theo quy định`,
  },
  
  unemploymentInsurance: {
    title: 'Bảo hiểm thất nghiệp (BHTN)',
    content: `Bảo hiểm thất nghiệp cho người lao động:

• Người lao động đóng: 1%
• Người sử dụng lao động đóng: 1%
• Tổng: 2%

Mức trần đóng: Theo lương tối thiểu vùng

Quyền lợi: Trợ cấp thất nghiệp, hỗ trợ đào tạo nghề khi mất việc`,
  },
  
  taxBracket: {
    title: 'Biểu thuế lũy tiến từng phần',
    content: `Thuế TNCN tính theo biểu lũy tiến từng phần - nghĩa là phần thu nhập vượt qua mỗi bậc sẽ chịu thuế suất của bậc đó.

Ví dụ: Thu nhập tính thuế 15 triệu
• 5 triệu đầu: 5% = 250,000đ
• 5 triệu tiếp: 10% = 500,000đ
• 5 triệu còn lại: 20% = 1,000,000đ
• Tổng thuế: 1,750,000đ

Đây là cách tính công bằng, thu nhập càng cao thì thuế suất càng cao.`,
  },
  
  incomeBeforeTax: {
    title: 'Thu nhập trước thuế',
    content: `Thu nhập trước thuế = Lương Gross - Bảo hiểm

Đây là số tiền còn lại sau khi trừ các khoản bảo hiểm bắt buộc, trước khi tính thuế TNCN.`,
  },
  
  taxableIncome: {
    title: 'Thu nhập tính thuế',
    content: `Thu nhập tính thuế = Thu nhập trước thuế - Giảm trừ gia cảnh

Đây là phần thu nhập chịu thuế TNCN theo biểu thuế lũy tiến.

Nếu < 0 thì không phải đóng thuế TNCN.`,
  },
  
  insuranceBase: {
    title: 'Mức lương đóng bảo hiểm',
    content: `Có 3 cách chọn mức lương đóng bảo hiểm:

1. Đóng full trên lương: Lấy lương thực tế (tối đa 46.8tr)
2. Đóng tối thiểu vùng: Lấy lương tối thiểu vùng
3. Tự nhập: Nhập mức lương muốn đóng

Lưu ý: Đóng thấp = đóng ít tiền nhưng quyền lợi BHXH về sau cũng thấp!`,
  },
  
  regionalMinimumWage: {
    title: 'Lương tối thiểu vùng',
    content: `Mức lương tối thiểu vùng:

Năm 2025:
• Vùng I: 4,960,000đ/tháng
• Vùng II: 4,410,000đ/tháng
• Vùng III: 3,860,000đ/tháng
• Vùng IV: 3,450,000đ/tháng

Từ 01/01/2026 (tăng 7.2%):
• Vùng I: 5,310,000đ/tháng
• Vùng II: 4,730,000đ/tháng
• Vùng III: 4,140,000đ/tháng
• Vùng IV: 3,700,000đ/tháng

Dùng để tính bảo hiểm tối thiểu.`,
  },
};

export const DEFAULT_VALUES = {
  salary: 20_000_000,
  dependents: 0,
  taxLawId: 'from2026' as const,
  mode: 'grossToNet' as const,
  insuranceOption: 'full' as const,
  region: 'region1' as const,
};

