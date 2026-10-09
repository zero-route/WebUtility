'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function useDisabledToolsNote() {
  const [note, setNote] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function fetchNote() {
      const { data, error } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'disabled_tools_note')
        .maybeSingle()

      if (!active) return

      if (error || !data) {
        setNote(null)
        return
      }

      setNote(data.value ?? null)
    }

    fetchNote()

    const channel = supabase
      .channel('app_settings_disabled_tools_note')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'app_settings',
          filter: 'key=eq.disabled_tools_note'
        },
        () => {
          fetchNote()
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
