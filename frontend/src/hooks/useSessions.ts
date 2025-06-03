import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface Session {
  id: string
  title: string
  trainer: string
  trainer_img: string
  start_time: number
  duration: number
  room: string
  date: Date
  level: string
  capacity: number
  attendees: number
}

export function useSessions(selectedDate: Date, selectedRoom: string) {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSessions() {
      try {
        setLoading(true)
        
        // Format date to YYYY-MM-DD for Supabase query
        const formattedDate = selectedDate.toISOString().split('T')[0]
        
        const { data, error } = await supabase
          .from('sessions')
          .select('*')
          .eq('date', formattedDate)
          .eq('room', selectedRoom)
          .order('start_time')

        if (error) throw error

        // Transform the data to match your Session interface
        const transformedSessions = data.map(session => ({
          ...session,
          date: new Date(session.date),
          trainer_img: session.trainer_img || '/default-trainer.png' // Provide a default image
        }))

        setSessions(transformedSessions)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [selectedDate, selectedRoom])

  return { sessions, loading, error }
} 