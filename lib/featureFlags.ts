
import { supabase } from './supabaseClient'

export type ToolFeatureStatus =
  | 'enabled'
  | 'admin_disabled'
  | 'unavailable'

export type ToolFeatureResult = {
  status: ToolFeatureStatus
  enabled: boolean
  reason: string | null
}

export async function isToolEnabled(
  toolId: string
): Promise<ToolFeatureResult> {
  const { data, error } = await supabase
    .from('feature_flags')
    .select('is_enabled, disabled_reason')
    .eq('tool_id', toolId)
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('[FeatureFlags] ERROR', {
      tool_id: toolId,
      reason: 'Supabase request failed',
      error
    })

    return {
      status: 'unavailable',
      enabled: false,
      reason: null
    }
  }

  if (!data) {
    console.error('[FeatureFlags] ERROR', {
      tool_id: toolId,
      reason: 'Feature flag record not found'
    })

    return {
      status: 'unavailable',
      enabled: false,
      reason: null
    }
  }

  if (data.is_enabled === false) {
    return {
      status: 'admin_disabled',
      enabled: false,
      reason: data.disabled_reason?.trim() || null
    }
  }

  if (data.is_enabled !== true) {
    return {
      status: 'unavailable',
      enabled: false,
      reason: null
    }
  }

  return {
    status: 'enabled',
    enabled: true,
    reason: null
  }
}
