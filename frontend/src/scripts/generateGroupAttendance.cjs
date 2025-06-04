const fs = require('fs');
const path = require('path');

const groups = require('../data/groups.json').groups;
const typeOfGroups = require('../data/type_of_groups.json').type_of_groups;

// Build a map from type_of_group id to capacity
const typeCapacity = {};
typeOfGroups.forEach(tg => {
  typeCapacity[tg.id] = tg.capacity;
});

// Build a map from group_id to type_of_group
const groupType = {};
groups.forEach(g => {
  groupType[g.id] = g.type_of_group;
});

const maxClients = 100;
const attendance = [];
let id = 1;

for (let groupId = 1; groupId <= 150; groupId++) {
  const type = groupType[groupId];
  const capacity = typeCapacity[type] || 0;
  for (let i = 0; i < capacity && i < maxClients; i++) {
    attendance.push({
      id: id++,
      client_id: ((groupId - 1) * 8 + i) % maxClients + 1,
      group_id: groupId
    });
  }
}

const output = { group_attendance: attendance };
fs.writeFileSync(path.join(__dirname, '../data/group_attendance.json'), JSON.stringify(output, null, 2));
console.log('group_attendance.json generated for group_ids 1-150.'); 