/**
 * Fiji 2026 Payroll Calculation Engine
 * 
 * FNPF: 8% of gross salary
 * PAYE (Progressive):
 * - $0 – $30,000: 0%
 * - $30,001 – $50,000: 18% of the excess over $30,000
 * - Over $50,000: $3,600 + 20% of the excess over $50,000
 */

export const calculateFijiTax = (annualGross, monthlyAllowances = 0, monthlyDeductions = 0) => {
    // 1. Employee FNPF Calculation (8%)
    const fnpf = annualGross * 0.08;

    // 1b. Employer FNPF Calculation (10%) - For Reference Output
    const employerFnpf = annualGross * 0.10;

    // 2. PAYE Calculation (2026 Progressive Standards)
    let paye = 0;
    if (annualGross <= 30000) {
        paye = 0;
    } else if (annualGross <= 50000) {
        paye = (annualGross - 30000) * 0.18;
    } else {
        // Bracket: $3,600 + 20% of excess over $50k (up to $270k)
        paye = 3600 + (annualGross - 50000) * 0.20;
    }

    const monthlyGrossBase = annualGross / 12;
    const monthlyTotalEarnings = monthlyGrossBase + monthlyAllowances;

    // Subtractions: FNPF (Emp), PAYE, and any Custom Deductions (Loans, etc.)
    const monthlyFnpf = fnpf / 12;
    const monthlyPaye = paye / 12;
    const netPay = monthlyTotalEarnings - monthlyFnpf - monthlyPaye - monthlyDeductions;

    return {
        annualGross,
        annualFnpf: fnpf,
        annualPaye: paye,
        employerFnpfAnnual: employerFnpf,
        monthlyGross: monthlyGrossBase,
        monthlyAllowances,
        monthlyDeductions,
        monthlyFnpf,
        monthlyPaye,
        monthlyNet: netPay,
        employerFnpfMonthly: employerFnpf / 12
    };
};
