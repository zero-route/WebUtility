'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function useDisabledToolsNote() {
  const [note, setNote] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function load() {
      const { data } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'disabled_tools_note')
        .maybeSingle()

      if (!active) return

      const value = typeof data?.value === 'string' ? data.value.trim() : ''
      setNote(value || null)
    }

    load()

    const channel = supabase
      .channel('disabled-tools-note')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'app_settings',
          filter: 'key=eq.disabled_tools_note'
        },
        (payload) => {
          if (!active) return

          const row = payload.new as { value?: string | null } | null
          const value = typeof row?.value === 'string' ? row.value.trim() : ''

          setNote(value || null)
        }
      )
      .subscribe()

    return () => {
      active = false
      supabase.removeChannel(channel)
    }
  }, [])

  return note
}