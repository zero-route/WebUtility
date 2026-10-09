'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export type ToolFeatureStatus =
  | 'loading'
  | 'active'
  | 'admin_disabled'
  | 'unavailable'
  | 'error'

type FeatureFlagState = {
  enabled: boolean | null
  status: ToolFeatureStatus
  reason: string | null
  debugDetail: string | null
}

const loadingState: FeatureFlagState = {
  enabled: null,
  status: 'loading',
  reason: null,
  debugDetail: null
}

export function useToolEnabled(toolId: string) {
  const [state, setState] = useState<FeatureFlagState>(loadingState)

  useEffect(() => {
    let active = true

    async function fetchFlag() {
      setState(loadingState)

      const { data, error } = await supabase
        .from('feature_flags')
        .select('is_enabled, disabled_reason')
        .eq('tool_id', toolId)
        .maybeSingle()

      if (!active) return

      if (error) {
        setState({
          enabled: false,
          status: 'error',
          reason: 'Terjadi gangguan saat mengambil status tools dari server.',
          debugDetail: `${error.code ?? 'ERR'}: ${error.message}`
        })
        return
      }

      if (!data) {
        setState({
          enabled: false,
          status: 'unavailable',
          reason: 'Tools belum terdaftar di sistem.',
          debugDetail: `Baris '${toolId}' tidak ditemukan di tabel feature_flags`
        })
        return
      }

      if (typeof data.is_enabled !== 'boolean') {
        setState({
          enabled: false,
          status: 'error',
          reason: 'Data status tools tidak valid.',
          debugDetail: `Kolom is_enabled bukan boolean (dapat: ${typeof data.is_enabled})`
        })
        return
      }

      if (!data.is_enabled) {
        setState({
          enabled: false,
          status: 'admin_disabled',
          reason: data.disabled_reason ?? null,
          debugDetail: null
        })
        return
      }

      setState({
        enabled: true,
        status: 'active',
        reason: null,
        debugDetail: null
      })
    }

    fetchFlag()

    const channel = supabase
      .channel(`feature_flags_${toolId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'feature_flags',
          filter: `tool_id=eq.${toolId}`
        },
        () => {
          fetchFlag()
        }
      )
      .subscribe()

    return () => {
      active = false
      supabase.removeChannel(channel)
    }
  }, [toolId])

  return state
}
