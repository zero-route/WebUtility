import { supabase } from './supabaseClient'

export async function getManualLocation(): Promise<{ latitude: number; longitude: number } | null> {
  const { data, error } = await supabase
    .from('app_settings')
    .select('key, value')
    .in('key', ['manual_latitude', 'manual_longitude'])

  if (error || !data) return null

  const latRow = data.find((row) => row.key === 'manual_latitude')
  const lonRow = data.find((row) => row.key === 'manual_longitude')

  const latitude = latRow?.value ? parseFloat(latRow.value) : NaN
  const longitude = lonRow?.value ? parseFloat(lonRow.value) : NaN

  if (Number.isNaN(latitude) || Number.isNaN(longitude)) return null

  return { latitude, longitude }
}
