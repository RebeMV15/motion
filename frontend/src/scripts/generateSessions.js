import { format, parseISO, getDay, addDays } from 'date-fns';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load data using fs and JSON.parse
const roomsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/rooms.json'), 'utf-8'));
const groupsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/groups.json'), 'utf-8'));

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Build a lookup: { [weekday][room_id][time]: group }
const groupLookup = {};
groupsData.groups.forEach(group => {
  if (!groupLookup[group.weekday]) groupLookup[group.weekday] = {};
  if (!groupLookup[group.weekday][group.room_id]) groupLookup[group.weekday][group.room_id] = {};
  groupLookup[group.weekday][group.room_id][group.time] = group;
});

function generateSessions(startDate, endDate) {
  const sessions = [];
  let date = parseISO(startDate);
  const end = parseISO(endDate);

  while (date <= end) {
    const weekday = weekdays[getDay(date)];
    const formattedDate = format(date, 'yyyy-MM-dd');

    // Skip weekends
    if (weekday !== 'Saturday' && weekday !== 'Sunday') {
      roomsData.rooms.forEach(room => {
        // For this weekday and room, get all times from the groupLookup
        const roomGroups = groupLookup[weekday]?.[room.id];
        if (roomGroups) {
          Object.keys(roomGroups).forEach(time => {
            const group = roomGroups[time];
            const session = {
              id: `${formattedDate}-${room.id}-${time}`,
              date: formattedDate,
              weekday,
              time,
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
        }
      });
    }
    date = addDays(date, 1);
  }
  return sessions;
}

// Generate sessions for June 2025
const sessions = generateSessions('2025-06-01', '2025-06-30');

// Create the sessions object
const sessionsData = {
  sessions
};

// Write to sessions.json
const filePath = path.join(__dirname, '../data/sessions.json');
fs.writeFileSync(filePath, JSON.stringify(sessionsData, null, 2));

console.log(`Generated ${sessions.length} sessions for June 2025`); 