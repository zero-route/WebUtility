import { supabase } from './supabaseClient'

export async function isToolEnabled(toolId: string): Promise<{ enabled: boolean; reason: string | null }> {
  const { data, error } = await supabase
    .from('feature_flags')
    .select('is_enabled, disabled_reason')
    .eq('tool_id', toolId)
    .maybeSingle()

  if (error || !data) {
    return { enabled: true, reason: null }
  }

  return { enabled: data.is_enabled, reason: data.disabled_reason }
}
