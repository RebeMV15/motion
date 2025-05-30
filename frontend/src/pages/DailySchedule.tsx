import React, { useState, ReactElement } from 'react'

const DailySchedule: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState('Room 1')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const rooms = ['Room 1', 'Room 2', 'Room 3', 'Studio 1', 'Studio 2']

  // Function to get the week dates
  const getWeekDates = (date: Date) => {
    const start = new Date(date)
    start.setDate(date.getDate() - date.getDay())
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

  // Generate time slots from 6 AM to 10 PM
  const generateTimeSlots = (): ReactElement[] => {
    const slots: ReactElement[] = []
    for (let hour = 6; hour <= 22; hour++) {
      slots.push(
        <div key={hour} className="relative">
          {/* Hour label */}
          <div className="absolute -left-16 w-14 text-right text-sm text-gray-500">
            {hour.toString().padStart(2, '0')}:00
          </div>
          
          {/* Hour slot divided into two 30-minute intervals */}
          <div className="h-24 border-b border-gray-200">
            {/* First 30-minute interval */}
            <div className="h-12 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
              {/* Session content will go here */}
            </div>
            {/* Second 30-minute interval */}
            <div className="h-12 hover:bg-gray-50 cursor-pointer">
              {/* Session content will go here */}
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