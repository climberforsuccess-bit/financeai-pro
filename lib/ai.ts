// ============================================
// AI FUNCTIONS - OpenAI Integration Stubs
// ============================================

import type { ScannerResult, Subscription } from '@/types/index'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ''
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

// ============================================
// ERROR HANDLING
// ============================================

export class AIError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AIError'
  }
}

const handleAIError = (error: any): AIError => {
  const message = error?.message || 'AI request failed'
  console.error('[AI Error]', message)
  return new AIError(message)
}

// ============================================
// CORE AI FUNCTIONS
// ============================================

/**
 * Generic OpenAI API call
 */
const callOpenAI = async (
  messages: Array<{ role: 'system' | 'user'; content: string }>,
  temperature: number = 0.7
): Promise<string> => {
  try {
    if (!OPENAI_API_KEY) {
      throw new AIError('OpenAI API key not configured')
    }

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      throw new AIError(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    throw handleAIError(error)
  }
}

// ============================================
// RECEIPT SCANNING / OCR
// ============================================

/**
 * Process receipt image and extract transaction data
 * Uses OpenAI Vision API
 */
export const processReceiptWithVision = async (imageUrl: string): Promise<ScannerResult> => {
  try {
    const messages: Array<{ role: 'system' | 'user'; content: string }> = [
      {
        role: 'system',
        content: `You are a receipt OCR expert. Extract transaction details from receipts and respond in valid JSON format.
        Return: { store: string, amount: number, category: string, date: string (ISO), items: string[] }
        Categories: groceries, restaurants, utilities, entertainment, transportation, healthcare, shopping, subscriptions, other`,
      },
      {
        role: 'user',
        content: `Extract transaction data from this receipt image: ${imageUrl}`,
      },
    ]

    const response = await callOpenAI(messages, 0.3)
    const parsed = JSON.parse(response)

    return {
      store: parsed.store || 'Unknown Store',
      amount: parseFloat(parsed.amount) || 0,
      category: (parsed.category || 'other') as any,
      date: parsed.date || new Date().toISOString().split('T')[0],
      items: parsed.items || [],
    }
  } catch (error) {
    throw handleAIError(error)
  }
}

// ============================================
// TRANSACTION AUTO-CATEGORIZATION
// ============================================

/**
 * Automatically categorize a transaction based on description
 */
export const autoCategorizeTransaction = async (description: string): Promise<string> => {
  try {
    const categories = [
      'groceries',
      'restaurants',
      'utilities',
      'entertainment',
      'transportation',
      'healthcare',
      'shopping',
      'subscriptions',
      'salary',
      'freelance',
      'investment',
      'other',
    ]

    const messages: Array<{ role: 'system' | 'user'; content: string }> = [
      {
        role: 'system',
        content: `You are a financial categorization expert. Given a transaction description, return ONLY the category name.
        Valid categories: ${categories.join(', ')}
        Do not include explanations or quotes. Just the category word.`,
      },
      {
        role: 'user',
        content: `Categorize this transaction: "${description}"`,
      },
    ]

    const response = await callOpenAI(messages, 0.3)
    const category = response.trim().toLowerCase()

    return categories.includes(category) ? category : 'other'
  } catch (error) {
    throw handleAIError(error)
  }
}

// ============================================
// SUBSCRIPTION SUGGESTIONS
// ============================================

/**
 * Get AI suggestion for cheaper subscription alternative
 */
export const getSuggestionForSubscription = async (
  subscriptionName: string,
  amount: number
): Promise<{ alternative: string; savings: number; reason: string } | null> => {
  try {
    const messages: Array<{ role: 'system' | 'user'; content: string }> = [
      {
        role: 'system',
        content: `You are a financial advisor specializing in subscription optimization.
        Suggest cheaper or free alternatives to popular subscriptions.
        Respond in JSON format: { alternative: string, savings: number, reason: string }
        If no alternative exists, return null.`,
      },
      {
        role: 'user',
        content: `User pays $${amount}/month for "${subscriptionName}". Suggest a cheaper or free alternative.`,
      },
    ]

    const response = await callOpenAI(messages, 0.7)
    
    if (response.toLowerCase().includes('null')) {
      return null
    }

    const parsed = JSON.parse(response)
    return {
      alternative: parsed.alternative || 'N/A',
      savings: parseFloat(parsed.savings) || 0,
      reason: parsed.reason || 'Better value option available',
    }
  } catch (error) {
    console.warn('Subscription suggestion failed:', error)
    return null
  }
}

// ============================================
// FINANCIAL INSIGHTS
// ============================================

/**
 * Generate personalized financial insight based on user data
 */
export const generateFinancialInsight = async (
  userContext: {
    monthly_income: number
    monthly_expenses: number
    total_debt: number
    spending_by_category: Record<string, number>
  }
): Promise<string> => {
  try {
    const messages: Array<{ role: 'system' | 'user'; content: string }> = [
      {
        role: 'system',
        content: `You are a personal finance advisor. Given user financial data, provide ONE actionable insight.
        Keep it concise (1-2 sentences). Focus on savings, debt reduction, or spending optimization.`,
      },
      {
        role: 'user',
        content: `
        Monthly income: $${userContext.monthly_income}
        Monthly expenses: $${userContext.monthly_expenses}
        Total debt: $${userContext.total_debt}
        Spending breakdown: ${JSON.stringify(userContext.spending_by_category)}
        
        Provide one actionable financial insight.
        `,
      },
    ]

    return await callOpenAI(messages, 0.8)
  } catch (error) {
    throw handleAIError(error)
  }
}

// ============================================
// DEBT PAYOFF RECOMMENDATIONS
// ============================================

/**
 * Recommend best debt payoff strategy based on user profile
 */
export const recommendDebtStrategy = async (
  debts: Array<{ name: string; amount: number; interest_rate: number }>,
  userProfile: { is_motivated_by_wins: boolean }
): Promise<'Avalanche' | 'Snowball' | 'Hybrid'> => {
  try {
    const messages: Array<{ role: 'system' | 'user'; content: string }> = [
      {
        role: 'system',
        content: `You are a debt payoff strategist. Recommend ONE strategy: Avalanche (minimize interest), Snowball (quick wins), or Hybrid (balanced).
        Consider both the financial math and psychological factors.
        Respond with ONLY the strategy name.`,
      },
      {
        role: 'user',
        content: `
        Debts: ${JSON.stringify(debts)}
        User is motivated by quick wins: ${userProfile.is_motivated_by_wins}
        
        Recommend the best strategy (respond with only: Avalanche, Snowball, or Hybrid).
        `,
      },
    ]

    const response = await callOpenAI(messages, 0.5)
    const strategy = response.trim().toLowerCase()

    if (strategy.includes('avalanche')) return 'Avalanche'
    if (strategy.includes('snowball')) return 'Snowball'
    return 'Hybrid'
  } catch (error) {
    console.warn('Strategy recommendation failed, defaulting to Avalanche')
    return 'Avalanche'
  }
}

// ============================================
// BUDGET ALERTS & RECOMMENDATIONS
// ============================================

/**
 * Generate budget alert message if spending is high
 */
export const generateBudgetAlert = async (
  category: string,
  spent: number,
  budget: number,
  percentageUsed: number
): Promise<string> => {
  try {
    if (percentageUsed < 75) {
      return `You're using ${percentageUsed}% of your ${category} budget`
    }

    const messages: Array<{ role: 'system' | 'user'; content: string }> = [
      {
        role: 'system',
        content: `You are a friendly financial advisor. Create a SHORT warning message (1 sentence) for overspending.
        Be motivating, not judgmental. Keep it under 100 characters.`,
      },
      {
        role: 'user',
        content: `User has spent $${spent} of their $${budget} budget for ${category} (${percentageUsed}% used).`,
      },
    ]

    return await callOpenAI(messages, 0.7)
  } catch (error) {
    return `Alert: You've used ${percentageUsed}% of your ${category} budget`
  }
}

// ============================================
// SAVINGS GOAL INSIGHTS
// ============================================

/**
 * Generate motivation message for savings goal
 */
export const generateGoalInsight = async (
  goalName: string,
  currentAmount: number,
  targetAmount: number,
  monthlyContribution: number,
  monthsRemaining: number
): Promise<string> => {
  try {
    const progressPercentage = (currentAmount / targetAmount) * 100

    const messages: Array<{ role: 'system' | 'user'; content: string }> = [
      {
        role: 'system',
        content: `You are a motivational financial coach. Create a SHORT encouraging message (1-2 sentences) about reaching a savings goal.
        Be genuine and specific. Keep it under 150 characters.`,
      },
      {
        role: 'user',
        content: `
        Goal: ${goalName}
        Progress: $${currentAmount} / $${targetAmount} (${Math.round(progressPercentage)}%)
        Monthly contribution: $${monthlyContribution}
        Time to goal: ${monthsRemaining} months
        `,
      },
    ]

    return await callOpenAI(messages, 0.8)
  } catch (error) {
    return `You're making great progress towards ${goalName}! Keep it up.`
  }
}

// ============================================
// EXPENSE PATTERN ANALYSIS
// ============================================

/**
 * Analyze spending patterns and suggest optimizations
 */
export const analyzeSpendingPatterns = async (
  monthlySpendingByCategory: Record<string, number[]>
): Promise<Array<{ category: string; insight: string; potential_savings: number }>> => {
  try {
    const messages: Array<{ role: 'system' | 'user'; content: string }> = [
      {
        role: 'system',
        content: `Analyze spending patterns and suggest savings opportunities.
        Respond in JSON array format: [{ category: string, insight: string, potential_savings: number }]
        Focus on the top 3 spending categories.`,
      },
      {
        role: 'user',
        content: `
        Monthly spending by category (last 3 months):
        ${JSON.stringify(monthlySpendingByCategory)}
        
        Analyze patterns and suggest 2-3 optimization opportunities.
        `,
      },
    ]

    const response = await callOpenAI(messages, 0.7)
    return JSON.parse(response)
  } catch (error) {
    console.warn('Spending analysis failed')
    return []
  }
}

// ============================================
// HEALTH CHECK
// ============================================

/**
 * Check if OpenAI API is accessible
 */
export const checkAIHealth = async (): Promise<boolean> => {
  try {
    if (!OPENAI_API_KEY) {
      console.warn('OpenAI API key not configured')
      return false
    }

    const messages: Array<{ role: 'system' | 'user'; content: string }> = [
      {
        role: 'system',
        content: 'You are a helpful assistant.',
      },
      {
        role: 'user',
        content: 'Say "OK" if you understand.',
      },
    ]

    const response = await callOpenAI(messages, 0.5)
    return response.toLowerCase().includes('ok')
  } catch (error) {
    console.error('AI health check failed:', error)
    return false
  }
}
