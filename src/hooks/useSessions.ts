import { useState, useEffect } from 'react'

export interface Session {
  id: string
  title: string
  trainer: string
  trainer_img: string
  start_time: number
  duration: number
  room: string
  date: Date
  weekday: string
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
        
        // Format date to YYYY-MM-DD for query
        const formattedDate = selectedDate.toISOString().split('T')[0]
        
        // Transform the data to match your Session interface
        const transformedSessions = [
          {
            id: '1',
            title: 'Session 1',
            trainer: 'Trainer 1',
            trainer_img: '/default-trainer.png',
            start_time: 1000,
            duration: 60,
            room: 'Room 1',
            date: new Date(formattedDate),
            weekday: 'Monday',
            level: 'Level 1',
            capacity: 10,
            attendees: 5
          },
          {
            id: '2',
            title: 'Session 2',
            trainer: 'Trainer 2',
            trainer_img: '/default-trainer.png',
            start_time: 1100,
            duration: 60,
            room: 'Room 2',
            date: new Date(formattedDate),
            weekday: 'Monday',
            level: 'Level 2',
            capacity: 15,
            attendees: 8
          }
        ]

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