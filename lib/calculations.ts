// ============================================
// CALCULATIONS - Debt Strategies & Formulas
// ============================================

import type { Debt, DebtPayoffStrategy, DebtPaymentMonth, DebtPayment } from '@/types/index'
import { roundTo } from './utils'

// ============================================
// DEBT PAYOFF STRATEGIES
// ============================================

/**
 * AVALANCHE STRATEGY
 * Pay minimum on all debts, put extra towards highest interest rate
 * Minimizes total interest paid
 */
export const calculateAvalancheStrategy = (
  debts: Debt[],
  extraMonthlyPayment: number = 0
): DebtPayoffStrategy => {
  if (debts.length === 0) {
    return {
      strategy_name: 'Avalanche',
      total_interest_paid: 0,
      months_to_payoff: 0,
      timeline: [],
    }
  }

  // Sort by interest rate DESC (highest first)
  const sortedDebts = [...debts].sort((a, b) => b.interest_rate - a.interest_rate)

  const timeline: DebtPaymentMonth[] = []
  let remainingDebts = sortedDebts.map((d) => ({
    ...d,
    remaining_balance: d.amount,
  }))

  let month = 0
  let totalInterestPaid = 0

  while (remainingDebts.some((d) => d.remaining_balance > 0) && month < 600) {
    month++
    const monthPayments: DebtPayment[] = []
    let monthExtraPayment = extraMonthlyPayment

    // Calculate interest for all debts
    for (let i = 0; i < remainingDebts.length; i++) {
      const debt = remainingDebts[i]
      if (debt.remaining_balance <= 0) continue

      const monthlyInterestRate = debt.interest_rate / 12 / 100
      const interest = debt.remaining_balance * monthlyInterestRate
      let payment = debt.monthly_payment

      // Apply extra payment to highest interest debt first
      if (i === 0 && monthExtraPayment > 0) {
        payment += monthExtraPayment
        monthExtraPayment = 0
      }

      const principal = Math.min(payment - interest, debt.remaining_balance)
      const actualPayment = Math.min(payment, debt.remaining_balance + interest)

      debt.remaining_balance = Math.max(0, debt.remaining_balance - principal)
      totalInterestPaid += interest

      monthPayments.push({
        debt_id: debt.id,
        debt_name: debt.name,
        payment_amount: actualPayment,
        principal: principal,
        interest: interest,
        remaining_balance: debt.remaining_balance,
      })
    }

    timeline.push({
      month,
      date: new Date(Date.now() + month * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      payments: monthPayments,
      total_paid: monthPayments.reduce((sum, p) => sum + p.payment_amount, 0),
    })
  }

  return {
    strategy_name: 'Avalanche',
    total_interest_paid: roundTo(totalInterestPaid),
    months_to_payoff: month,
    timeline,
  }
}

/**
 * SNOWBALL STRATEGY
 * Pay minimum on all debts, put extra towards smallest balance
 * Psychological wins, slower but motivating
 */
export const calculateSnowballStrategy = (
  debts: Debt[],
  extraMonthlyPayment: number = 0
): DebtPayoffStrategy => {
  if (debts.length === 0) {
    return {
      strategy_name: 'Snowball',
      total_interest_paid: 0,
      months_to_payoff: 0,
      timeline: [],
    }
  }

  // Sort by balance ASC (smallest first)
  const sortedDebts = [...debts].sort((a, b) => a.amount - b.amount)

  const timeline: DebtPaymentMonth[] = []
  let remainingDebts = sortedDebts.map((d) => ({
    ...d,
    remaining_balance: d.amount,
  }))

  let month = 0
  let totalInterestPaid = 0

  while (remainingDebts.some((d) => d.remaining_balance > 0) && month < 600) {
    month++
    const monthPayments: DebtPayment[] = []
    let monthExtraPayment = extraMonthlyPayment

    // Recalculate order each month (snowball effect)
    remainingDebts.sort((a, b) => a.remaining_balance - b.remaining_balance)

    for (let i = 0; i < remainingDebts.length; i++) {
      const debt = remainingDebts[i]
      if (debt.remaining_balance <= 0) continue

      const monthlyInterestRate = debt.interest_rate / 12 / 100
      const interest = debt.remaining_balance * monthlyInterestRate
      let payment = debt.monthly_payment

      // Apply extra payment to lowest balance debt first
      if (i === 0 && monthExtraPayment > 0) {
        payment += monthExtraPayment
        monthExtraPayment = 0
      }

      const principal = Math.min(payment - interest, debt.remaining_balance)
      const actualPayment = Math.min(payment, debt.remaining_balance + interest)

      debt.remaining_balance = Math.max(0, debt.remaining_balance - principal)
      totalInterestPaid += interest

      monthPayments.push({
        debt_id: debt.id,
        debt_name: debt.name,
        payment_amount: actualPayment,
        principal: principal,
        interest: interest,
        remaining_balance: debt.remaining_balance,
      })
    }

    timeline.push({
      month,
      date: new Date(Date.now() + month * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      payments: monthPayments,
      total_paid: monthPayments.reduce((sum, p) => sum + p.payment_amount, 0),
    })
  }

  return {
    strategy_name: 'Snowball',
    total_interest_paid: roundTo(totalInterestPaid),
    months_to_payoff: month,
    timeline,
  }
}

/**
 * HYBRID STRATEGY
 * Custom blend between Avalanche (optimal) and Snowball (motivational)
 * avalancheWeight: 0-1 (0 = pure Snowball, 1 = pure Avalanche)
 */
export const calculateHybridStrategy = (
  debts: Debt[],
  extraMonthlyPayment: number = 0,
  avalancheWeight: number = 0.5
): DebtPayoffStrategy => {
  const avalanche = calculateAvalancheStrategy(debts, extraMonthlyPayment)
  const snowball = calculateSnowballStrategy(debts, extraMonthlyPayment)

  const blendedInterest =
    avalanche.total_interest_paid * avalancheWeight +
    snowball.total_interest_paid * (1 - avalancheWeight)

  const blendedMonths =
    Math.round(avalanche.months_to_payoff * avalancheWeight) +
    Math.round(snowball.months_to_payoff * (1 - avalancheWeight))

  return {
    strategy_name: 'Hybrid',
    total_interest_paid: roundTo(blendedInterest),
    months_to_payoff: blendedMonths,
    timeline: avalanche.timeline, // Use Avalanche timeline as base
  }
}

// ============================================
// COMPARATIVE ANALYSIS
// ============================================

export const compareDebtStrategies = (
  debts: Debt[],
  extraMonthlyPayment: number = 0
) => {
  const avalanche = calculateAvalancheStrategy(debts, extraMonthlyPayment)
  const snowball = calculateSnowballStrategy(debts, extraMonthlyPayment)

  const interestDifference = snowball.total_interest_paid - avalanche.total_interest_paid
  const timeDifference = snowball.months_to_payoff - avalanche.months_to_payoff

  return {
    strategies: { avalanche, snowball },
    comparison: {
      best_for_savings: avalanche,
      best_for_motivation: snowball,
      interest_savings: roundTo(interestDifference),
      time_difference_months: timeDifference,
    },
  }
}

// ============================================
// WHAT-IF SIMULATOR
// ============================================

export const simulateExtraPayment = (
  debts: Debt[],
  strategy: 'avalanche' | 'snowball' | 'hybrid',
  extraMonthlyAmount: number
) => {
  let result

  switch (strategy) {
    case 'avalanche':
      result = calculateAvalancheStrategy(debts, extraMonthlyAmount)
      break
    case 'snowball':
      result = calculateSnowballStrategy(debts, extraMonthlyAmount)
      break
    case 'hybrid':
      result = calculateHybridStrategy(debts, extraMonthlyAmount, 0.5)
      break
  }

  return {
    ...result,
    extra_monthly_payment: extraMonthlyAmount,
  }
}

// ============================================
// QUICK CALCULATIONS
// ============================================

export const calculateTotalDebt = (debts: Debt[]): number => {
  return debts.reduce((sum, debt) => sum + debt.amount, 0)
}

export const calculateAverageInterestRate = (debts: Debt[]): number => {
  if (debts.length === 0) return 0
  const totalRate = debts.reduce((sum, debt) => sum + debt.interest_rate, 0)
  return roundTo(totalRate / debts.length)
}

export const calculateMonthlyDebtPayment = (debts: Debt[]): number => {
  return debts.reduce((sum, debt) => sum + debt.monthly_payment, 0)
}

export const calculatePayoffDate = (timeline: DebtPaymentMonth[]): string | null => {
  if (timeline.length === 0) return null
  const lastMonth = timeline[timeline.length - 1]
  return lastMonth.date
}

export const estimateSavingsWithExtraPayment = (
  debts: Debt[],
  strategy: 'avalanche' | 'snowball',
  extraMonthlyAmount: number
): number => {
  const withoutExtra =
    strategy === 'avalanche'
      ? calculateAvalancheStrategy(debts, 0)
      : calculateSnowballStrategy(debts, 0)

  const withExtra =
    strategy === 'avalanche'
      ? calculateAvalancheStrategy(debts, extraMonthlyAmount)
      : calculateSnowballStrategy(debts, extraMonthlyAmount)

  return roundTo(withoutExtra.total_interest_paid - withExtra.total_interest_paid)
}

// ============================================
// BUDGET & SAVINGS CALCULATIONS
// ============================================

export const calculateSavingsRate = (income: number, expenses: number): number => {
  if (income === 0) return 0
  return roundTo(((income - expenses) / income) * 100)
}

export const calculateBudgetHealth = (spent: number, budget: number): number => {
  if (budget === 0) return 0
  return roundTo((spent / budget) * 100)
}

export const calculateMonthlyAverage = (amounts: number[]): number => {
  if (amounts.length === 0) return 0
  return roundTo(amounts.reduce((a, b) => a + b, 0) / amounts.length)
}

export const calculateGoalProgress = (current: number, target: number): number => {
  if (target === 0) return 0
  return roundTo((current / target) * 100)
}

export const estimateMonthsToGoal = (current: number, target: number, monthlyContribution: number): number => {
  if (monthlyContribution === 0 || current >= target) return 0
  return Math.ceil((target - current) / monthlyContribution)
}

