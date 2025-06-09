const { format, parseISO, getDay } = require('date-fns');
const roomsData = require('../data/rooms.json');
const groupsData = require('../data/groups.json');

interface Session {
  id: string;
  date: string;
  weekday: string;
  time: string;
  room: {
    id: number;
    name: string;
    capacity: number;
  };
  group: {
    id: number;
    type_of_group: number;
    level: number;
    capacity: number;
  };
}

interface Room {
  id: number;
  name: string;
  capacity: number;
}

interface Group {
  id: number;
  weekday: string;
  time: string;
  room_id: number;
  type_of_group: number;
  level: number;
  capacity: number;
}

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const generateSessions = (startDate: string, endDate: string): Session[] => {
  const sessions: Session[] = [];
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  
  // Iterate through each date in the range
  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    const weekday = weekdays[getDay(date)];
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    // Skip weekends
    if (weekday === 'Saturday' || weekday === 'Sunday') continue;
    
    // For each room
    roomsData.rooms.forEach((room: Room) => {
      // Find groups for this weekday and room
      const matchingGroups = groupsData.groups.filter(
        (group: Group) => group.weekday === weekday && group.room_id === room.id
      );
      
      // Create a session for each matching group
      matchingGroups.forEach((group: Group) => {
        const session: Session = {
          id: `${formattedDate}-${room.id}-${group.time}`,
          date: formattedDate,
          weekday,
          time: group.time,
          room: {
            id: room.id,
            name: room.name,
            capacity: room.capacity
          },
          group: {
            id: group.id,
            type_of_group: group.type_of_group,
            level: group.level,
            capacity: group.capacity
          }
        };
        sessions.push(session);
      });
    });
  }
  
  return sessions;
};

// Alias for generateSessions
const generateGroupSessions = generateSessions;

module.exports = { generateSessions, generateGroupSessions }; 