import React, { useState, ReactElement } from 'react'

// Types for sessions
type Session = {
  id: string
  title: string
  trainer: string
  startTime: number // hour
  duration: number // in hours
  room: string
  date: Date
}

const DailySchedule: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState('Room 1')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const rooms = ['Room 1', 'Room 2', 'Room 3', 'Studio 1', 'Studio 2']

  // Helper function to compare dates (ignoring time)
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate()
  }

  // Mock sessions data
  const mockSessions: Session[] = [
    // Sunday (May 18)
    {
      id: '1',
      title: 'Morning Yoga',
      trainer: 'John Doe',
      startTime: 8,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 4, 18) // May 18, 2025
    },
    {
      id: '2',
      title: 'Pilates Basics',
      trainer: 'Jane Smith',
      startTime: 9,
      duration: 1,
      room: 'Room 2',
      date: new Date(2025, 4, 18)
    },
    {
      id: '3',
      title: 'HIIT Training',
      trainer: 'Mike Johnson',
      startTime: 10,
      duration: 1.5,
      room: 'Studio 1',
      date: new Date(2025, 4, 18)
    },

    // Monday (May 19)
    {
      id: '4',
      title: 'Zumba',
      trainer: 'Sarah Wilson',
      startTime: 14,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 4, 19)
    },
    {
      id: '5',
      title: 'Boxing Class',
      trainer: 'Alex Brown',
      startTime: 15,
      duration: 1,
      room: 'Studio 2',
      date: new Date(2025, 4, 19)
    },

    // Tuesday (May 20)
    {
      id: '6',
      title: 'Power Yoga',
      trainer: 'John Doe',
      startTime: 9,
      duration: 1.5,
      room: 'Studio 1',
      date: new Date(2025, 4, 20)
    },
    {
      id: '7',
      title: 'CrossFit',
      trainer: 'Mike Johnson',
      startTime: 11,
      duration: 1,
      room: 'Room 2',
      date: new Date(2025, 4, 20)
    },

    // Wednesday (May 21)
    {
      id: '8',
      title: 'Yoga Flow',
      trainer: 'John Doe',
      startTime: 8,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 4, 21)
    },
    {
      id: '9',
      title: 'Pilates Advanced',
      trainer: 'Jane Smith',
      startTime: 10,
      duration: 1,
      room: 'Room 2',
      date: new Date(2025, 4, 21)
    },

    // Thursday (May 22)
    {
      id: '10',
      title: 'Morning HIIT',
      trainer: 'Mike Johnson',
      startTime: 8,
      duration: 1,
      room: 'Studio 1',
      date: new Date(2025, 4, 22)
    },
    {
      id: '11',
      title: 'Yoga Stretch',
      trainer: 'John Doe',
      startTime: 11,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 4, 22)
    },

    // Friday (May 23)
    {
      id: '12',
      title: 'Pilates Flow',
      trainer: 'Jane Smith',
      startTime: 9,
      duration: 1,
      room: 'Room 2',
      date: new Date(2025, 4, 23)
    },
    {
      id: '13',
      title: 'Zumba Party',
      trainer: 'Sarah Wilson',
      startTime: 12,
      duration: 1,
      room: 'Studio 1',
      date: new Date(2025, 4, 23)
    },

    // Saturday (May 24)
    {
      id: '14',
      title: 'Weekend Yoga',
      trainer: 'John Doe',
      startTime: 9,
      duration: 1.5,
      room: 'Room 1',
      date: new Date(2025, 4, 24)
    },
    {
      id: '15',
      title: 'Boxing Skills',
      trainer: 'Alex Brown',
      startTime: 11,
      duration: 1,
      room: 'Studio 2',
      date: new Date(2025, 4, 24)
    },

    // Sunday (May 25)
    {
      id: '16',
      title: 'Meditation',
      trainer: 'Sarah Wilson',
      startTime: 10,
      duration: 1,
      room: 'Room 3',
      date: new Date(2025, 4, 25)
    },
    {
      id: '17',
      title: 'Dance Fitness',
      trainer: 'Sarah Wilson',
      startTime: 14,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 4, 25)
    },

    // Monday (May 26)
    {
      id: '18',
      title: 'HIIT Training',
      trainer: 'Mike Johnson',
      startTime: 9,
      duration: 1,
      room: 'Studio 1',
      date: new Date(2025, 4, 26)
    },
    {
      id: '19',
      title: 'Pilates Basics',
      trainer: 'Jane Smith',
      startTime: 11,
      duration: 1,
      room: 'Room 2',
      date: new Date(2025, 4, 26)
    },

    // Tuesday (May 27)
    {
      id: '20',
      title: 'Yoga Flow',
      trainer: 'John Doe',
      startTime: 8,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 4, 27)
    },
    {
      id: '21',
      title: 'CrossFit',
      trainer: 'Mike Johnson',
      startTime: 15,
      duration: 1.5,
      room: 'Studio 2',
      date: new Date(2025, 4, 27)
    },

    // Wednesday (May 28)
    {
      id: '22',
      title: 'Zumba',
      trainer: 'Sarah Wilson',
      startTime: 10,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 4, 28)
    },
    {
      id: '23',
      title: 'Boxing Class',
      trainer: 'Alex Brown',
      startTime: 14,
      duration: 1,
      room: 'Studio 2',
      date: new Date(2025, 4, 28)
    },

    // Thursday (May 29)
    {
      id: '24',
      title: 'Power Yoga',
      trainer: 'John Doe',
      startTime: 9,
      duration: 1.5,
      room: 'Studio 1',
      date: new Date(2025, 4, 29)
    },
    {
      id: '25',
      title: 'Pilates Advanced',
      trainer: 'Jane Smith',
      startTime: 11,
      duration: 1,
      room: 'Room 2',
      date: new Date(2025, 4, 29)
    },

    // Friday (May 30)
    {
      id: '26',
      title: 'Morning HIIT',
      trainer: 'Mike Johnson',
      startTime: 8,
      duration: 1,
      room: 'Studio 1',
      date: new Date(2025, 4, 30)
    },
    {
      id: '27',
      title: 'Yoga Stretch',
      trainer: 'John Doe',
      startTime: 12,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 4, 30)
    },

    // Saturday (May 31)
    {
      id: '28',
      title: 'Weekend Pilates',
      trainer: 'Jane Smith',
      startTime: 9,
      duration: 1,
      room: 'Room 2',
      date: new Date(2025, 4, 31)
    },
    {
      id: '29',
      title: 'Zumba Party',
      trainer: 'Sarah Wilson',
      startTime: 11,
      duration: 1,
      room: 'Studio 1',
      date: new Date(2025, 4, 31)
    },

    // Sunday (June 1)
    {
      id: '30',
      title: 'Morning Yoga',
      trainer: 'John Doe',
      startTime: 8,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 5, 1)
    },
    {
      id: '31',
      title: 'Meditation',
      trainer: 'Sarah Wilson',
      startTime: 10,
      duration: 1,
      room: 'Room 3',
      date: new Date(2025, 5, 1)
    },

    // Monday (June 2)
    {
      id: '32',
      title: 'HIIT Training',
      trainer: 'Mike Johnson',
      startTime: 9,
      duration: 1.5,
      room: 'Studio 1',
      date: new Date(2025, 5, 2)
    },
    {
      id: '33',
      title: 'Boxing Skills',
      trainer: 'Alex Brown',
      startTime: 14,
      duration: 1,
      room: 'Studio 2',
      date: new Date(2025, 5, 2)
    },

    // Tuesday (June 3)
    {
      id: '34',
      title: 'Yoga Flow',
      trainer: 'John Doe',
      startTime: 8,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 5, 3)
    },
    {
      id: '35',
      title: 'Pilates Basics',
      trainer: 'Jane Smith',
      startTime: 11,
      duration: 1,
      room: 'Room 2',
      date: new Date(2025, 5, 3)
    },

    // Wednesday (June 4)
    {
      id: '36',
      title: 'CrossFit',
      trainer: 'Mike Johnson',
      startTime: 10,
      duration: 1,
      room: 'Studio 1',
      date: new Date(2025, 5, 4)
    },
    {
      id: '37',
      title: 'Dance Fitness',
      trainer: 'Sarah Wilson',
      startTime: 15,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 5, 4)
    },

    // Thursday (June 5)
    {
      id: '38',
      title: 'Power Yoga',
      trainer: 'John Doe',
      startTime: 9,
      duration: 1.5,
      room: 'Studio 1',
      date: new Date(2025, 5, 5)
    },
    {
      id: '39',
      title: 'Boxing Class',
      trainer: 'Alex Brown',
      startTime: 14,
      duration: 1,
      room: 'Studio 2',
      date: new Date(2025, 5, 5)
    },

    // Friday (June 6)
    {
      id: '40',
      title: 'Pilates Advanced',
      trainer: 'Jane Smith',
      startTime: 10,
      duration: 1,
      room: 'Room 2',
      date: new Date(2025, 5, 6)
    },
    {
      id: '41',
      title: 'Zumba',
      trainer: 'Sarah Wilson',
      startTime: 12,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 5, 6)
    },

    // Saturday (June 7)
    {
      id: '42',
      title: 'Weekend Yoga',
      trainer: 'John Doe',
      startTime: 9,
      duration: 1.5,
      room: 'Room 1',
      date: new Date(2025, 5, 7)
    },
    {
      id: '43',
      title: 'HIIT Training',
      trainer: 'Mike Johnson',
      startTime: 11,
      duration: 1,
      room: 'Studio 1',
      date: new Date(2025, 5, 7)
    }
  ]

  // Function to get sessions for the selected room and time
  const getSessionForTime = (hour: number): Session | undefined => {
    return mockSessions.find(session => 
      session.room === selectedRoom && 
      session.startTime === hour &&
      isSameDay(session.date, selectedDate)
    )
  }

  // Function to get the session that spans this time slot
  const getSessionForTimeSlot = (hour: number, isFirstHalf: boolean): Session | undefined => {
    return mockSessions.find(session => 
      session.room === selectedRoom && 
      isSameDay(session.date, selectedDate) &&
      (session.startTime === hour || 
       (session.startTime < hour && session.startTime + session.duration > hour))
    )
  }

  // Function to get the week dates
  const getWeekDates = (date: Date) => {
    const start = new Date(date)
    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const day = start.getDay()
    // Adjust to get Monday as the first day (if Sunday, go back 6 days, otherwise go back day-1 days)
    const diff = day === 0 ? -6 : 1 - day
    start.setDate(date.getDate() + diff)
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      return d
    })
  }

  // Function to format date as "MMM YYYY"
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  // Function to format day of week
  const formatDayOfWeek = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  }

  // Function to format day of month
  const formatDayOfMonth = (date: Date) => {
    return date.getDate().toString()
  }

  // Function to check if date is today
  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
  }

  // Function to check if date is selected
  const isSelected = (date: Date) => {
    return date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
  }

  // Navigation functions
  const goToPreviousWeek = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(selectedDate.getDate() - 7)
    setSelectedDate(newDate)
  }

  const goToNextWeek = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(selectedDate.getDate() + 7)
    setSelectedDate(newDate)
  }

  // Generate time slots from 8 AM to 10 PM
  const generateTimeSlots = (): ReactElement[] => {
    const slots: ReactElement[] = []
    for (let hour = 8; hour <= 22; hour++) {
      const firstHalfSession = getSessionForTimeSlot(hour, true)
      const secondHalfSession = getSessionForTimeSlot(hour, false)
      
      slots.push(
        <div key={hour} className="relative">
          {/* Hour label */}
          <div className="absolute -left-16 w-14 text-right text-sm text-gray-500">
            {hour}
          </div>
          
          {/* Hour slot divided into two 30-minute intervals */}
          <div className="h-24 border-b border-gray-200">
            {/* First 30-minute interval */}
            <div className="h-12 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
              {firstHalfSession && (
                <div className="p-2 bg-primary-100 rounded">
                  <div className="font-medium text-sm">{firstHalfSession.title}</div>
                  <div className="text-xs text-gray-600">{firstHalfSession.trainer}</div>
                </div>
              )}
            </div>
            {/* Second 30-minute interval */}
            <div className="h-12 hover:bg-gray-50 cursor-pointer">
              {secondHalfSession && (
                <div className="p-2 bg-primary-100 rounded">
                  <div className="font-medium text-sm">{secondHalfSession.title}</div>
                  <div className="text-xs text-gray-600">{secondHalfSession.trainer}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }
    return slots
  }

  const weekDates = getWeekDates(selectedDate)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Daily Schedule</h2>
        <div className="relative">
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {rooms.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Date Selector */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={goToPreviousWeek}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="text-lg font-semibold text-gray-900">{formatMonthYear(selectedDate)}</h3>
            <button
              onClick={goToNextWeek}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Day Tabs */}
        <div className="grid grid-cols-7 gap-2">
          {weekDates.map((date) => (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                isSelected(date)
                  ? 'bg-primary-500 text-white'
                  : isToday(date)
                  ? 'bg-primary-100 text-primary-700'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="text-sm font-medium">{formatDayOfWeek(date)}</span>
              <span className="text-lg font-semibold">{formatDayOfMonth(date)}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Time Grid */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="relative pl-16">
          {generateTimeSlots()}
        </div>
      </div>
    </div>
  )
}

export default DailySchedule 