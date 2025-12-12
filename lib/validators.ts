// ============================================
// VALIDATION UTILITIES
// ============================================

export function validateSalary(salary: number): { valid: boolean; message?: string } {
  if (salary < 0) {
    return { valid: false, message: 'Lương không thể âm' };
  }
  
  if (salary === 0) {
    return { valid: false, message: 'Vui lòng nhập lương' };
  }
  
  if (salary > 1_000_000_000) {
    return { valid: false, message: 'Lương quá lớn (> 1 tỷ)' };
  }
  
  return { valid: true };
}

export function validateDependents(dependents: number): { valid: boolean; message?: string } {
  if (dependents < 0) {
    return { valid: false, message: 'Số người phụ thuộc không thể âm' };
  }
  
  if (dependents > 20) {
    return { valid: false, message: 'Số người phụ thuộc quá nhiều (> 20)' };
  }
  
  if (!Number.isInteger(dependents)) {
    return { valid: false, message: 'Số người phụ thuộc phải là số nguyên' };
  }
  
  return { valid: true };
}

export function validateInsuranceBase(base: number): { valid: boolean; message?: string } {
  if (base < 0) {
    return { valid: false, message: 'Mức đóng bảo hiểm không thể âm' };
  }
  
  if (base > 36_000_000) {
    return { valid: false, message: 'Vượt quá trần đóng BHXH (36 triệu)' };
  }
  
  return { valid: true };
}

