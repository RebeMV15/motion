import { supabase } from './supabase'

export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select('count')
      .limit(1)

    if (error) {
      console.error('Supabase connection error:', error.message)
      return false
    }

    console.log('Supabase connection successful!')
    return true
  } catch (err) {
    console.error('Unexpected error:', err)
    return false
  }
} 