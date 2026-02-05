import { describe, it, expect } from 'vitest';
import { calculateFijiTax } from './src/utils/fijiPayroll';

describe('Fiji Payroll Logic', () => {
    it('should calculate 0 tax for salary <= 30000', () => {
        const res = calculateFijiTax(25000);
        expect(res.paye).toBe(0);
        expect(res.fnpf).toBe(2000); // 8% of 25000
        expect(res.annualNet).toBe(23000);
    });

    it('should calculate 18% tax for salary between 30k and 50k', () => {
        const res = calculateFijiTax(40000);
        // paye = (40000 - 30000) * 0.18 = 1800
        expect(res.paye).toBe(1800);
        expect(res.fnpf).toBe(3200); // 8% of 40000
        expect(res.annualNet).toBe(35000);
    });

    it('should calculate $3600 + 20% for salary > 50k', () => {
        const res = calculateFijiTax(60000);
        // paye = 3600 + (60000 - 50000) * 0.20 = 3600 + 2000 = 5600
        expect(res.paye).toBe(5600);
        expect(res.fnpf).toBe(4800); // 8% of 60000
        expect(res.annualNet).toBe(49600);
    });
});
