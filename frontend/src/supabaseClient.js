import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rstlnfbliltpncppoehw.supabase.co'
const supabaseAnonKey = '<eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzdGxuZmJsaWx0cG5jcHBvZWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDMzNzQsImV4cCI6MjA2NDQxOTM3NH0.cPknzXGdHjTlxPZVh3yrA1U3-zosBu2ZrAKyOwItCOU
>'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
