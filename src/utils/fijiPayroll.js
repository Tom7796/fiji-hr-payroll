/**
 * Fiji 2026 Payroll Calculation Engine
 * 
 * FNPF: 8% of gross salary
 * PAYE (Progressive):
 * - $0 – $30,000: 0%
 * - $30,001 – $50,000: 18% of the excess over $30,000
 * - Over $50,000: $3,600 + 20% of the excess over $50,000
 */

export const calculateFijiTax = (annualGross) => {
    // 1. FNPF Calculation (8%)
    const fnpf = annualGross * 0.08;

    // 2. PAYE Calculation (Progressive)
    let paye = 0;
    if (annualGross <= 30000) {
        paye = 0;
    } else if (annualGross <= 50000) {
        paye = (annualGross - 30000) * 0.18;
    } else {
        paye = 3600 + (annualGross - 50000) * 0.20;
    }

    const annualNet = annualGross - fnpf - paye;

    return {
        annualGross,
        fnpf,
        paye,
        annualNet,
        monthlyGross: annualGross / 12,
        monthlyFnpf: fnpf / 12,
        monthlyPaye: paye / 12,
        monthlyNet: annualNet / 12
    };
};
