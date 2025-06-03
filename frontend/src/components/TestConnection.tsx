import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function TestConnection() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [details, setDetails] = useState<string>('')

  useEffect(() => {
    async function testConnection() {
      try {
        // First, log the environment variables (without the key for security)
        console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
        console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)

        const { data, error } = await supabase
          .from('sessions')
          .select('count')
          .limit(1)

        if (error) {
          throw error
        }

        setStatus('success')
        setMessage('Successfully connected to Supabase!')
        setDetails(`Found ${data?.length || 0} sessions`)
        console.log('Connection test result:', data)
      } catch (err) {
        setStatus('error')
        const errorMessage = err instanceof Error ? err.message : 'Failed to connect to Supabase'
        setMessage(errorMessage)
        setDetails(err instanceof Error ? err.stack || '' : '')
        console.error('Connection test error:', err)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Supabase Connection Test</h2>
      <div className={`p-4 rounded ${
        status === 'loading' ? 'bg-yellow-100' :
        status === 'success' ? 'bg-green-100' :
        'bg-red-100'
      }`}>
        <p className="font-medium">
          {status === 'loading' ? 'Testing connection...' :
           status === 'success' ? '✅ ' + message :
           '❌ ' + message}
        </p>
        {details && (
          <pre className="mt-2 text-sm whitespace-pre-wrap">
            {details}
          </pre>
        )}
      </div>
    </div>
  )
} 