import React, { useState, ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

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
  const rooms = ['Room 1', 'Room 2', 'Room 3', 'Studio 1', 'Studio 2']
  const navigate = useNavigate()

  // Helper function to compare dates (ignoring time)
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate()
  }

  function getRandomLevel() {
    return (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3;
  }

  function getRandomCapacity() {
    const capacities = [1, 5, 8];
    return capacities[Math.floor(Math.random() * capacities.length)];
  }

  function getRandomAttendees(capacity: number) {
    return Math.floor(Math.random() * capacity) + 1;
  }

  // Mock sessions data
  const mockSessions: Session[] = [
    // Sunday (May 18)
    {
      id: '1',
      title: 'Morning Yoga',
      trainer: 'John Doe',
      trainerImg: trainerImages['John Doe'],
      startTime: 8,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 4, 18),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '2',
      title: 'Pilates Basics',
      trainer: 'Jane Smith',
      trainerImg: trainerImages['Jane Smith'],
      startTime: 9,
      duration: 1,
      room: 'Room 2',
      date: new Date(2025, 4, 18),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '3',
      title: 'HIIT Training',
      trainer: 'Mike Johnson',
      trainerImg: trainerImages['Mike Johnson'],
      startTime: 10,
      duration: 1.5,
      room: 'Studio 1',
      date: new Date(2025, 4, 18),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },

    // Monday (May 19)
    {
      id: '4',
      title: 'Zumba',
      trainer: 'Sarah Wilson',
      trainerImg: trainerImages['Sarah Wilson'],
      startTime: 14,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 4, 19),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '5',
      title: 'Boxing Class',
      trainer: 'Alex Brown',
      trainerImg: trainerImages['Alex Brown'],
      startTime: 15,
      duration: 1,
      room: 'Studio 2',
      date: new Date(2025, 4, 19),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },

    // Tuesday (May 20)
    {
      id: '6',
      title: 'Power Yoga',
      trainer: 'John Doe',
      trainerImg: trainerImages['John Doe'],
      startTime: 9,
      duration: 1.5,
      room: 'Studio 1',
      date: new Date(2025, 4, 20),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '7',
      title: 'CrossFit',
      trainer: 'Mike Johnson',
      trainerImg: trainerImages['Mike Johnson'],
      startTime: 11,
      duration: 1,
      room: 'Room 2',
      date: new Date(2025, 4, 20),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },

    // Wednesday (May 21)
    {
      id: '8',
      title: 'Yoga Flow',
      trainer: 'John Doe',
      trainerImg: trainerImages['John Doe'],
      startTime: 8,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 4, 21),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '9',
      title: 'Pilates Advanced',
      trainer: 'Jane Smith',
      trainerImg: trainerImages['Jane Smith'],
      startTime: 10,
      duration: 1,
      room: 'Room 2',
      date: new Date(2025, 4, 21),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },

    // Thursday (May 22)
    {
      id: '10',
      title: 'Morning HIIT',
      trainer: 'Mike Johnson',
      trainerImg: trainerImages['Mike Johnson'],
      startTime: 8,
      duration: 1,
      room: 'Studio 1',
      date: new Date(2025, 4, 22),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '11',
      title: 'Yoga Stretch',
      trainer: 'John Doe',
      trainerImg: trainerImages['John Doe'],
      startTime: 11,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 4, 22),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },

    // Friday (May 23)
    {
      id: '12',
      title: 'Pilates Flow',
      trainer: 'Jane Smith',
      trainerImg: trainerImages['Jane Smith'],
      startTime: 9,
      duration: 1,
      room: 'Room 2',
      date: new Date(2025, 4, 23),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '13',
      title: 'Zumba Party',
      trainer: 'Sarah Wilson',
      trainerImg: trainerImages['Sarah Wilson'],
      startTime: 12,
      duration: 1,
      room: 'Studio 1',
      date: new Date(2025, 4, 23),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },

    // Saturday (May 24)
    {
      id: '14',
      title: 'Weekend Yoga',
      trainer: 'John Doe',
      trainerImg: trainerImages['John Doe'],
      startTime: 9,
      duration: 1.5,
      room: 'Room 1',
      date: new Date(2025, 4, 24),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '15',
      title: 'Boxing Skills',
      trainer: 'Alex Brown',
      trainerImg: trainerImages['Alex Brown'],
      startTime: 11,
      duration: 1,
      room: 'Studio 2',
      date: new Date(2025, 4, 24),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },

    // Sunday (May 25)
    {
      id: '16',
      title: 'Meditation',
      trainer: 'Sarah Wilson',
      trainerImg: trainerImages['Sarah Wilson'],
      startTime: 10,
      duration: 1,
      room: 'Room 3',
      date: new Date(2025, 4, 25),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '17',
      title: 'Dance Fitness',
      trainer: 'Sarah Wilson',
      trainerImg: trainerImages['Sarah Wilson'],
      startTime: 14,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 4, 25),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },

    // Monday (May 26)
    {
      id: '18',
      title: 'HIIT Training',
      trainer: 'Mike Johnson',
      trainerImg: trainerImages['Mike Johnson'],
      startTime: 9,
      duration: 1,
      room: 'Studio 1',
      date: new Date(2025, 4, 26),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '19',
      title: 'Pilates Basics',
      trainer: 'Jane Smith',
      trainerImg: trainerImages['Jane Smith'],
      startTime: 11,
      duration: 1,
      room: 'Room 2',
      date: new Date(2025, 4, 26),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },

    // Tuesday (May 27)
    {
      id: '20',
      title: 'Yoga Flow',
      trainer: 'John Doe',
      trainerImg: trainerImages['John Doe'],
      startTime: 8,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 4, 27),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '21',
      title: 'CrossFit',
      trainer: 'Mike Johnson',
      trainerImg: trainerImages['Mike Johnson'],
      startTime: 15,
      duration: 1.5,
      room: 'Studio 2',
      date: new Date(2025, 4, 27),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },

    // Wednesday (May 28)
    {
      id: '22',
      title: 'Zumba',
      trainer: 'Sarah Wilson',
      trainerImg: trainerImages['Sarah Wilson'],
      startTime: 10,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 4, 28),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '23',
      title: 'Boxing Class',
      trainer: 'Alex Brown',
      trainerImg: trainerImages['Alex Brown'],
      startTime: 14,
      duration: 1,
      room: 'Studio 2',
      date: new Date(2025, 4, 28),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },

    // Thursday (May 29)
    {
      id: '24',
      title: 'Power Yoga',
      trainer: 'John Doe',
      trainerImg: trainerImages['John Doe'],
      startTime: 9,
      duration: 1.5,
      room: 'Studio 1',
      date: new Date(2025, 4, 29),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '25',
      title: 'Pilates Advanced',
      trainer: 'Jane Smith',
      trainerImg: trainerImages['Jane Smith'],
      startTime: 11,
      duration: 1,
      room: 'Room 2',
      date: new Date(2025, 4, 29),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },

    // Friday (May 30)
    {
      id: '26',
      title: 'Morning HIIT',
      trainer: 'Mike Johnson',
      trainerImg: trainerImages['Mike Johnson'],
      startTime: 8,
      duration: 1,
      room: 'Studio 1',
      date: new Date(2025, 4, 30),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '27',
      title: 'Yoga Stretch',
      trainer: 'John Doe',
      trainerImg: trainerImages['John Doe'],
      startTime: 12,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 4, 30),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },

    // Saturday (May 31)
    {
      id: '28',
      title: 'Weekend Pilates',
      trainer: 'Jane Smith',
      trainerImg: trainerImages['Jane Smith'],
      startTime: 9,
      duration: 1,
      room: 'Room 2',
      date: new Date(2025, 4, 31),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '29',
      title: 'Zumba Party',
      trainer: 'Sarah Wilson',
      trainerImg: trainerImages['Sarah Wilson'],
      startTime: 11,
      duration: 1,
      room: 'Studio 1',
      date: new Date(2025, 4, 31),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },

    // Sunday (June 1)
    {
      id: '30',
      title: 'Morning Yoga',
      trainer: 'John Doe',
      trainerImg: trainerImages['John Doe'],
      startTime: 8,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 5, 1),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '31',
      title: 'Meditation',
      trainer: 'Sarah Wilson',
      trainerImg: trainerImages['Sarah Wilson'],
      startTime: 10,
      duration: 1,
      room: 'Room 3',
      date: new Date(2025, 5, 1),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },

    // Monday (June 2)
    {
      id: '32',
      title: 'HIIT Training',
      trainer: 'Mike Johnson',
      trainerImg: trainerImages['Mike Johnson'],
      startTime: 9,
      duration: 1.5,
      room: 'Studio 1',
      date: new Date(2025, 5, 2),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '33',
      title: 'Boxing Skills',
      trainer: 'Alex Brown',
      trainerImg: trainerImages['Alex Brown'],
      startTime: 14,
      duration: 1,
      room: 'Studio 2',
      date: new Date(2025, 5, 2),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },

    // Tuesday (June 3)
    {
      id: '34',
      title: 'Yoga Flow',
      trainer: 'John Doe',
      trainerImg: trainerImages['John Doe'],
      startTime: 8,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 5, 3),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '35',
      title: 'Pilates Basics',
      trainer: 'Jane Smith',
      trainerImg: trainerImages['Jane Smith'],
      startTime: 11,
      duration: 1,
      room: 'Room 2',
      date: new Date(2025, 5, 3),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },

    // Wednesday (June 4)
    {
      id: '36',
      title: 'CrossFit',
      trainer: 'Mike Johnson',
      trainerImg: trainerImages['Mike Johnson'],
      startTime: 10,
      duration: 1,
      room: 'Studio 1',
      date: new Date(2025, 5, 4),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '37',
      title: 'Dance Fitness',
      trainer: 'Sarah Wilson',
      trainerImg: trainerImages['Sarah Wilson'],
      startTime: 15,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 5, 4),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },

    // Thursday (June 5)
    {
      id: '38',
      title: 'Power Yoga',
      trainer: 'John Doe',
      trainerImg: trainerImages['John Doe'],
      startTime: 9,
      duration: 1.5,
      room: 'Studio 1',
      date: new Date(2025, 5, 5),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '39',
      title: 'Boxing Class',
      trainer: 'Alex Brown',
      trainerImg: trainerImages['Alex Brown'],
      startTime: 14,
      duration: 1,
      room: 'Studio 2',
      date: new Date(2025, 5, 5),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },

    // Friday (June 6)
    {
      id: '40',
      title: 'Pilates Advanced',
      trainer: 'Jane Smith',
      trainerImg: trainerImages['Jane Smith'],
      startTime: 10,
      duration: 1,
      room: 'Room 2',
      date: new Date(2025, 5, 6),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '41',
      title: 'Zumba',
      trainer: 'Sarah Wilson',
      trainerImg: trainerImages['Sarah Wilson'],
      startTime: 12,
      duration: 1,
      room: 'Room 1',
      date: new Date(2025, 5, 6),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },

    // Saturday (June 7)
    {
      id: '42',
      title: 'Weekend Yoga',
      trainer: 'John Doe',
      trainerImg: trainerImages['John Doe'],
      startTime: 9,
      duration: 1.5,
      room: 'Room 1',
      date: new Date(2025, 5, 7),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    },
    {
      id: '43',
      title: 'HIIT Training',
      trainer: 'Mike Johnson',
      trainerImg: trainerImages['Mike Johnson'],
      startTime: 11,
      duration: 1,
      room: 'Studio 1',
      date: new Date(2025, 5, 7),
      level: getRandomLevel(),
      get capacity() { return this._capacity || (this._capacity = getRandomCapacity()); },
      get attendees() { return this._attendees || (this._attendees = getRandomAttendees(this.capacity)); },
      _capacity: undefined as number | undefined,
      _attendees: undefined as number | undefined
    }
  ].map(session => {
    // For TypeScript, convert to plain object with resolved values
    const capacity = getRandomCapacity();
    const attendees = getRandomAttendees(capacity);
    return { ...session, capacity, attendees };
  });

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
      const session = mockSessions.find(session =>
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