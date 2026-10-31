import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export interface Card {
  id: string
  profile_id: string
  name: string
  card_type: string
  last_four: string
  balance: number
  limit_amount: number
  due_date: number
  apr: number
  owner_type: 'personal' | 'business'
  bank: string
  color: string
  is_active: boolean
  min_payment: number
  statement_date: number
  notes: string | null
  billing_cycle_start: number
  payment_status: string
  utilization_ratio: number
  created_at: string
  updated_at: string
}

export interface CreateCardInput {
  name: string
  card_type: string
  last_four: string
  balance: number
  limit_amount: number
  due_date: number
  apr: number
  owner_type: 'personal' | 'business'
  bank: string
  color?: string
  min_payment: number
  statement_date: number
  notes?: string
  billing_cycle_start: number
}

export function useCards(ownerType?: 'personal' | 'business') {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['cards', user?.id, ownerType],
    queryFn: async () => {
      if (!user?.id) return []

      let query = supabase
        .from('cards')
        .select('*')
        .eq('profile_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (ownerType) {
        query = query.eq('owner_type', ownerType)
      }

      const { data, error } = await query

      if (error) throw error
      return data as Card[]
    },
    enabled: !!user?.id,
  })
}

export function useCreateCard() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: async (input: CreateCardInput) => {
      if (!user?.id) throw new Error('No user logged in')

      const { data, error } = await supabase
        .from('cards')
        .insert({
          ...input,
          profile_id: user.id,
          utilization_ratio: (input.balance / input.limit_amount) * 100,
          color: input.color || '#3B82F6',
        })
        .select()
        .single()

      if (error) throw error
      return data as Card
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] })
    },
  })
}

export function useUpdateCard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...input }: Partial<Card> & { id: string }) => {
      const { data, error } = await supabase
        .from('cards')
        .update({
          ...input,
          utilization_ratio:
            input.balance && input.limit_amount
              ? (input.balance / input.limit_amount) * 100
              : undefined,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as Card
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] })
    },
  })
}

export function useDeleteCard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (cardId: string) => {
      const { error } = await supabase
        .from('cards')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', cardId)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] })
    },
  })
}

export function useCard(cardId: string) {
  return useQuery({
    queryKey: ['card', cardId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('id', cardId)
        .single()

      if (error) throw error
      return data as Card
    },
    enabled: !!cardId,
  })
}
