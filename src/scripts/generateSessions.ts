const { generateSessions } = require('../utils/sessionGenerator');
const fs = require('fs');
const path = require('path');

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