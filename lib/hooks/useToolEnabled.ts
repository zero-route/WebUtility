'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type FeatureFlagPayload = {
  tool_id?: string
  is_enabled?: boolean
  disabled_reason?: string | null
}

export function useToolEnabled(toolId: string) {
  const [enabled, setEnabled] = useState<boolean | null>(null)
  const [reason, setReason] = useState<string | null>(null)
  const instanceId = useRef(Math.random().toString(36).slice(2))

  useEffect(() => {
    let active = true

    const loadInitialState = async () => {
      const { data, error } = await supabase
        .from('feature_flags')
        .select('is_enabled, disabled_reason')
        .eq('tool_id', toolId)
        .maybeSingle()

      if (!active) return

      if (error || !data) {
        setEnabled(true)
        setReason(null)
        return
      }

      setEnabled(data.is_enabled)
      setReason(data.disabled_reason ?? null)
    }

    loadInitialState()

    const channel = supabase
      .channel(`feature-flag-${toolId}-${instanceId.current}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'feature_flags',
          filter: `tool_id=eq.${toolId}`,
        },
        (payload) => {
          if (!active) return

          const next = payload.new as FeatureFlagPayload

          if (payload.eventType === 'DELETE') {
            setEnabled(true)
            setReason(null)
            return
          }

          if (typeof next.is_enabled === 'boolean') {
            setEnabled(next.is_enabled)
            setReason(next.disabled_reason ?? null)
          }
        }
      )
      .subscribe()

    return () => {
      active = false
      supabase.removeChannel(channel)
    }
  }, [toolId])

  return {
    enabled,
    reason,
  }
}
