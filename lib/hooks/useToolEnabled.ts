'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type {
  ToolFeatureState,
  ToolFeatureStatus
} from '@/lib/featureFlags'

type FeatureFlagPayload = {
  tool_id?: string
  is_enabled?: boolean
  disabled_reason?: string | null
}

const unavailableState: ToolFeatureState = {
  status: 'unavailable',
  enabled: false,
  reason: 'Status : features_flags No info'
}

export function useToolEnabled(toolId: string) {
  const [state, setState] = useState<ToolFeatureState>({
    status: 'unavailable',
    enabled: false,
    reason: 'Status : features_flags No info'
  })

  const instanceId = useRef(Math.random().toString(36).slice(2))

  useEffect(() => {
    let active = true

    const setUnavailable = () => {
      if (!active) return

      setState(unavailableState)
    }

    const loadInitialState = async () => {
      const { data, error } = await supabase
        .from('feature_flags')
        .select('is_enabled, disabled_reason')
        .eq('tool_id', toolId)
        .maybeSingle()

      if (!active) return

      if (error) {
        console.error('[FeatureFlags] ERROR', {
          tool_id: toolId,
          reason: 'Supabase request failed',
          error: error.message
        })

        setUnavailable()
        return
      }

      if (!data || typeof data.is_enabled !== 'boolean') {
        console.error('[FeatureFlags] ERROR', {
          tool_id: toolId,
          reason: 'Feature flag data unavailable or invalid'
        })

        setUnavailable()
        return
      }

      if (data.is_enabled === false) {
        setState({
          status: 'admin_disabled',
          enabled: false,
          reason: data.disabled_reason ?? null
        })
        return
      }

      setState({
        status: 'enabled',
        enabled: true,
        reason: null
      })
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
          filter: `tool_id=eq.${toolId}`
        },
        (payload) => {
          if (!active) return

          if (payload.eventType === 'DELETE') {
            console.error('[FeatureFlags] ERROR', {
              tool_id: toolId,
              reason: 'Feature flag record deleted'
            })

            setUnavailable()
            return
          }

          const next = payload.new as FeatureFlagPayload

          if (typeof next.is_enabled !== 'boolean') {
            console.error('[FeatureFlags] ERROR', {
              tool_id: toolId,
              reason: 'Invalid realtime feature flag payload'
            })

            setUnavailable()
            return
          }

          if (next.is_enabled === false) {
            setState({
              status: 'admin_disabled',
              enabled: false,
              reason: next.disabled_reason ?? null
            })
            return
          }

          setState({
            status: 'enabled',
            enabled: true,
            reason: null
          })
        }
      )
      .subscribe((status) => {
        if (!active) return

        if (
          status === 'CHANNEL_ERROR' ||
          status === 'TIMED_OUT' ||
          status === 'CLOSED'
        ) {
          console.error('[FeatureFlags] ERROR', {
            tool_id: toolId,
            reason: `Realtime channel ${status}`
          })

          setUnavailable()
        }
      })

    return () => {
      active = false
      supabase.removeChannel(channel)
    }
  }, [toolId])

  const status: ToolFeatureStatus = state.status

  return {
    enabled: state.enabled,
    reason: state.reason,
    status
  }
}