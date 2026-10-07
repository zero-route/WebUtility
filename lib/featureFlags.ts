import { supabase } from './supabaseClient'

export type ToolFeatureStatus =
  | 'enabled'
  | 'admin_disabled'
  | 'unavailable'

export type ToolFeatureState = {
  status: ToolFeatureStatus
  enabled: boolean
  reason: string | null
}

export async function isToolEnabled(
  toolId: string
): Promise<ToolFeatureState> {
  const { data, error } = await supabase
    .from('feature_flags')
    .select('is_enabled, disabled_reason')
    .eq('tool_id', toolId)
    .maybeSingle()

  if (error) {
    console.error('[FeatureFlags] ERROR', {
      tool_id: toolId,
      reason: 'Supabase request failed',
      error: error.message
    })

    return {
      status: 'unavailable',
      enabled: false,
      reason: 'Status : features_flags No info'
    }
  }

  if (!data || typeof data.is_enabled !== 'boolean') {
    console.error('[FeatureFlags] ERROR', {
      tool_id: toolId,
      reason: 'Feature flag data unavailable or invalid'
    })

    return {
      status: 'unavailable',
      enabled: false,
      reason: 'Status : features_flags No info'
    }
  }

  if (data.is_enabled === false) {
    return {
      status: 'admin_disabled',
      enabled: false,
      reason: data.disabled_reason ?? null
    }
  }

  return {
    status: 'enabled',
    enabled: true,
    reason: null
  }
}