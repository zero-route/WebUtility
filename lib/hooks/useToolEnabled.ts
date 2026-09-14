'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function useToolEnabled(toolId: string) {
  const [enabled, setEnabled] = useState<boolean | null>(null)
  const [reason, setReason] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function load() {
      const { data } = await supabase
        .from('feature_flags')
        .select('is_enabled, disabled_reason')
        .eq('tool_id', toolId)
        .maybeSingle()

      if (!active) return
      setEnabled(data ? data.is_enabled : true)
      setReason(data?.disabled_reason ?? null)
    }

    load()

    const channel = supabase
      .channel(`feature_flags-${toolId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'feature_flags', filter: `tool_id=eq.${toolId}` },
        (payload) => {
          if (!active) return
          const row = payload.new as { is_enabled?: boolean; disabled_reason?: string | null } | null
          if (row && typeof row.is_enabled === 'boolean') {
            setEnabled(row.is_enabled)
            setReason(row.disabled_reason ?? null)
          }
        }
      )
      .subscribe()

    return () => {
      active = false
      supabase.removeChannel(channel)
    }
  }, [toolId])

  return { enabled, reason }
}
