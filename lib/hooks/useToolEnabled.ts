'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export type ToolFeatureStatus =
  | 'enabled'
  | 'admin_disabled'
  | 'unavailable'

type FeatureFlagPayload = {
  tool_id?: string
  is_enabled?: boolean
  disabled_reason?: string | null
}

type FeatureFlagState = {
  enabled: boolean | null
  status: ToolFeatureStatus
  reason: string | null
}

const unavailableState: FeatureFlagState = {
  enabled: false,
  status: 'unavailable',
  reason: 'Status : features_flags No info'
}

export function useToolEnabled(toolId: string) {
  const [state, setState] = useState<FeatureFlagState>({
    enabled: null,
    status: 'unavailable',
    reason: null
  })

  const requestIdRef = useRef(0)
  const mountedRef = useRef(false)

  const loadFeatureFlag = useCallback(async () => {
    const requestId = ++requestIdRef.current

    try {
      const { data, error } = await supabase
        .from('feature_flags')
        .select('is_enabled, disabled_reason')
        .eq('tool_id', toolId)
        .limit(1)
        .maybeSingle()

      if (!mountedRef.current) return

      if (requestId !== requestIdRef.current) return

      if (error) {
        console.error('[FeatureFlags] ERROR', {
          tool_id: toolId,
          reason: 'Supabase request failed',
          error
        })

        setState(unavailableState)
        return
      }

      if (!data) {
        console.error('[FeatureFlags] ERROR', {
          tool_id: toolId,
          reason: 'Feature flag record not found'
        })

        setState(unavailableState)
        return
      }

      if (typeof data.is_enabled !== 'boolean') {
        console.error('[FeatureFlags] ERROR', {
          tool_id: toolId,
          reason: 'Invalid feature flag value'
        })

        setState(unavailableState)
        return
      }

      if (data.is_enabled === false) {
        setState({
          enabled: false,
          status: 'admin_disabled',
          reason: data.disabled_reason ?? null
        })

        return
      }

      setState({
        enabled: true,
        status: 'enabled',
        reason: null
      })
    } catch (error) {
      if (!mountedRef.current) return

      if (requestId !== requestIdRef.current) return

      console.error('[FeatureFlags] ERROR', {
        tool_id: toolId,
        reason: 'Unexpected feature flag error',
        error
      })

      setState(unavailableState)
    }
  }, [toolId])

  useEffect(() => {
    mountedRef.current = true
    requestIdRef.current += 1

    void loadFeatureFlag()

    const channel = supabase
      .channel(`feature-flag-${toolId}-${Math.random().toString(36).slice(2)}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'feature_flags',
          filter: `tool_id=eq.${toolId}`
        },
        async (payload) => {
          if (!mountedRef.current) return

          if (payload.eventType === 'DELETE') {
            console.error('[FeatureFlags] ERROR', {
              tool_id: toolId,
              reason: 'Feature flag record deleted'
            })

            requestIdRef.current += 1
            setState(unavailableState)
            return
          }

          const next = payload.new as FeatureFlagPayload

          if (typeof next.is_enabled !== 'boolean') {
            console.error('[FeatureFlags] ERROR', {
              tool_id: toolId,
              reason: 'Invalid feature flag realtime payload'
            })

            await loadFeatureFlag()
            return
          }

          requestIdRef.current += 1

          if (next.is_enabled === false) {
            setState({
              enabled: false,
              status: 'admin_disabled',
              reason: next.disabled_reason ?? null
            })

            return
          }

          setState({
            enabled: true,
            status: 'enabled',
            reason: null
          })
        }
      )
      .subscribe((subscriptionStatus) => {
        if (!mountedRef.current) return

        if (
          subscriptionStatus === 'CHANNEL_ERROR' ||
          subscriptionStatus === 'TIMED_OUT'
        ) {
          console.error('[FeatureFlags] ERROR', {
            tool_id: toolId,
            reason: 'Realtime feature flag unavailable',
            status: subscriptionStatus
          })

          requestIdRef.current += 1
          setState(unavailableState)
        }
      })

    const pollInterval = window.setInterval(() => {
      if (!mountedRef.current) return
      void loadFeatureFlag()
    }, 30000)

    return () => {
      mountedRef.current = false
      requestIdRef.current += 1
      window.clearInterval(pollInterval)
      void supabase.removeChannel(channel)
    }
  }, [toolId, loadFeatureFlag])

  return state
}