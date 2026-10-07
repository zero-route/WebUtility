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

  const instanceId = useRef(
    Math.random().toString(36).slice(2)
  )

  const loadFeatureFlag = useCallback(
    async (retryCount = 0): Promise<boolean> => {
      try {
        const { data, error } = await supabase
          .from('feature_flags')
          .select('is_enabled, disabled_reason')
          .eq('tool_id', toolId)
          .limit(1)
          .maybeSingle()

        if (error) {
          if (retryCount < 2) {
            await new Promise((resolve) =>
              setTimeout(resolve, 500 * (retryCount + 1))
            )

            return loadFeatureFlag(retryCount + 1)
          }

          console.error('[FeatureFlags] ERROR', {
            tool_id: toolId,
            reason: 'Supabase request failed after retries',
            error
          })

          setState(unavailableState)
          return false
        }

        if (!data) {
          if (retryCount < 2) {
            await new Promise((resolve) =>
              setTimeout(resolve, 500 * (retryCount + 1))
            )

            return loadFeatureFlag(retryCount + 1)
          }

          console.error('[FeatureFlags] ERROR', {
            tool_id: toolId,
            reason: 'Feature flag record not found'
          })

          setState(unavailableState)
          return false
        }

        if (data.is_enabled === false) {
          setState({
            enabled: false,
            status: 'admin_disabled',
            reason: data.disabled_reason ?? null
          })

          return true
        }

        setState({
          enabled: true,
          status: 'enabled',
          reason: null
        })

        return true
      } catch (error) {
        if (retryCount < 2) {
          await new Promise((resolve) =>
            setTimeout(resolve, 500 * (retryCount + 1))
          )

          return loadFeatureFlag(retryCount + 1)
        }

        console.error('[FeatureFlags] ERROR', {
          tool_id: toolId,
          reason: 'Unexpected feature flag error',
          error
        })

        setState(unavailableState)
        return false
      }
    },
    [toolId]
  )

  useEffect(() => {
    let active = true

    void loadFeatureFlag()

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

            setState(unavailableState)
            return
          }

          const next = payload.new as FeatureFlagPayload

          if (typeof next.is_enabled !== 'boolean') {
            console.error('[FeatureFlags] ERROR', {
              tool_id: toolId,
              reason: 'Invalid feature flag payload'
            })

            void loadFeatureFlag()
            return
          }

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
        if (!active) return

        if (
          subscriptionStatus === 'CHANNEL_ERROR' ||
          subscriptionStatus === 'TIMED_OUT'
        ) {
          console.warn('[FeatureFlags] Realtime unavailable', {
            tool_id: toolId,
            status: subscriptionStatus
          })
        }
      })

    const pollInterval = window.setInterval(() => {
      if (!active) return
      void loadFeatureFlag()
    }, 30000)

    return () => {
      active = false
      window.clearInterval(pollInterval)
      supabase.removeChannel(channel)
    }
  }, [toolId, loadFeatureFlag])

  return state
}