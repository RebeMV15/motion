import React, { useState, ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import sessionsData from '../data/sessions.json';
import groupAttendanceData from '../data/group_attendance.json';
import typeOfGroupsData from '../data/type_of_groups.json';
import groupTrainers from '../data/group_trainers.json';

// Types for sessions
type Session = {
  id: string
  title: string
  trainer: string
  trainerImg: string // new: avatar image
  startTime: number // hour
  duration: number // in hours
  room: string
  date: Date
  level: 1 | 2 | 3 // new
  get capacity(): number
  get attendees(): number
}

const trainerImages: Record<string, string> = {
  'John Doe': 'https://randomuser.me/api/portraits/men/32.jpg',
  'Jane Smith': 'https://randomuser.me/api/portraits/women/44.jpg',
  'Mike Johnson': 'https://randomuser.me/api/portraits/men/65.jpg',
  'Sarah Wilson': 'https://randomuser.me/api/portraits/women/68.jpg',
  'Alex Brown': 'https://randomuser.me/api/portraits/men/12.jpg',
};

const DailySchedule: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState('Room 1')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const rooms = ['Room 1', 'Room 2']
  const navigate = useNavigate()

  // Helper function to compare dates (ignoring time)
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate()
  }

  // Helper: Map type_of_group id to capacity
  const typeOfGroupCapacity: Record<number, number> = {};
  typeOfGroupsData.type_of_groups.forEach((type: any) => {
    typeOfGroupCapacity[type.id] = type.capacity;
  });

  // Helper: Map group_id to number of clients
  const groupAttendanceCount: Record<number, number> = {};
  groupAttendanceData.group_attendance.forEach((entry: any) => {
    if (!groupAttendanceCount[entry.group_id]) groupAttendanceCount[entry.group_id] = 0;
    groupAttendanceCount[entry.group_id]++;
  });

  // Convert sessions.json data to Session[]
  const parseSessions = () => {
    return sessionsData.sessions.map((session: any) => {
      const dateObj = new Date(session.date);
      const startTime = parseInt(session.time.split(':')[0], 10);
      const groupId = session.group.id;
      const typeOfGroupId = session.group.type_of_group;
      // Get trainerId as 3-digit string from group_trainers.json
      const trainersMap = groupTrainers.group_trainers as Record<string, string>;
      const trainerId = trainersMap[String(groupId)] || '001';
      const trainerImg = `/avatars/trainer-${trainerId}.jpg`;
      return {
        id: session.id,
        title: `Group ${groupId}`,
        trainer: `Trainer ${trainerId}`,
        trainerImg,
        startTime,
        duration: 1,
        room: session.room.name,
        date: dateObj,
        level: session.group.level,
        capacity: typeOfGroupCapacity[typeOfGroupId] ?? 0,
        attendees: groupAttendanceCount[groupId] ?? 0
      };
    });
  };

  const sessions = parseSessions();

  // Function to get sessions for the selected room and time
  const getSessionForTime = (hour: number): Session | undefined => {
    return sessions.find(session => 
      session.room === selectedRoom && 
      session.startTime === hour &&
      isSameDay(session.date, selectedDate)
    )
  }

  // Function to get the session that spans this time slot
  const getSessionForTimeSlot = (hour: number, isFirstHalf: boolean): Session | undefined => {
    return sessions.find(session => 
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
      const session = sessions.find(session =>
        session.room === selectedRoom &&
        isSameDay(session.date, selectedDate) &&
        (session.startTime === hour || (session.startTime < hour && session.startTime + session.duration > hour))
      );
      const isFull = session && session.attendees >= session.capacity;
      let levelBg = 'bg-green-100', levelText = 'text-green-700';
      if (session?.level === 2) {
        levelBg = 'bg-[#FFF1B8]';
        levelText = 'text-[#AD8B00]';
      } else if (session?.level === 3) {
        levelBg = 'bg-[#EFDBFF]';
        levelText = 'text-[#391085]';
      }
      slots.push(
        <div key={hour} className="relative">
          {/* Hour label */}
          <div className="absolute -left-16 w-14 text-right text-sm text-gray-500">
            {hour}
          </div>
          {/* Session card or empty slot */}
          <div className="h-24 border-b border-gray-200 flex items-center">
            {session ? (
              <div
                className={`flex items-center w-full bg-white rounded shadow-sm pl-0 pr-4 py-2 ml-0 h-20 relative border-l-4 ${isFull ? 'border-red-500' : 'border-green-400'} cursor-pointer`}
                onClick={() => navigate(`/session/${session.id}`)}
                role="button"
                tabIndex={0}
                onKeyPress={e => { if (e.key === 'Enter') navigate(`/session/${session.id}`); }}
              >
                <img
                  src={session.trainerImg}
                  alt={session.trainer}
                  className="w-14 h-14 rounded-full object-cover ml-2 mr-4 border border-gray-200"
                />
                <div className="flex-1">
                  <div className="font-semibold text-lg text-gray-800">{selectedRoom}</div>
                  <div className={`inline-block px-2 py-0.5 text-xs rounded font-semibold mt-1 ${levelBg} ${levelText}`}>Level {session.level}</div>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-lg font-semibold">
                  {session.attendees}/{session.capacity}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      );
    }
    return slots;
  };

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