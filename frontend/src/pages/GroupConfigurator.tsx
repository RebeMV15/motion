import React, { useState, ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dropdown, Button, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import sessionsData from '../data/sessions.json';
import groupAttendanceData from '../data/group_attendance.json';
import typeOfGroupsData from '../data/type_of_groups.json';
import groupTrainers from '../data/group_trainers.json';

// Types for sessions
// ... existing code ...
type Session = {
  id: string
  title: string
  trainer: string
  trainerImg: string
  startTime: number
  duration: number
  room: string
  date: Date
  weekday: string
  level: 1 | 2 | 3
  get capacity(): number
  get attendees(): number
}

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const GroupConfigurator: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState('Room 1')
  const [selectedWeekday, setSelectedWeekday] = useState('Monday')
  const rooms = ['Room 1', 'Room 2']
  const navigate = useNavigate()

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setSelectedRoom(rooms[Number(e.key) - 1]);
  };

  const items: MenuProps['items'] = rooms.map((room, index) => ({
    key: String(index + 1),
    label: room,
  }));

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
        weekday: session.weekday ?? '',
        level: session.group.level,
        capacity: typeOfGroupCapacity[typeOfGroupId] ?? 0,
        attendees: groupAttendanceCount[groupId] ?? 0
      };
    });
  };

  const sessions = parseSessions();

  // Generate time slots from 8 AM to 10 PM
  const generateTimeSlots = (): ReactElement[] => {
    const slots: ReactElement[] = []
    for (let hour = 8; hour <= 22; hour++) {
      const session = sessions.find(session =>
        session.room === selectedRoom &&
        session.weekday === selectedWeekday &&
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
        <div key={hour} className="flex flex-row items-start">
          {/* Hour label */}
          <div style={{ maxWidth: 14, minWidth: 14, fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: 12, lineHeight: '16px', color: '#333333', fontWeight: 400 }} className="flex justify-end text-right h-24">
            {hour}
          </div>
          {/* 16px gap between time and card */}
          <div style={{ width: 16 }} />
          {/* Session card or empty slot */}
          <div className="h-24 border-b border-gray-200 flex items-center m-0 p-0 flex-1">
            {session ? (
              <div
                className={`flex items-center w-full h-full bg-[#fafafa] border-t border-b border-r border-solid border-gray-200 ${isFull ? 'border-l-[#cf1322]' : 'border-l-[#7CB305]'} border-l-[4px] cursor-pointer`}
                onClick={() => navigate(`/group/${session.id}`)}
                role="button"
                tabIndex={0}
                onKeyPress={e => { if (e.key === 'Enter') navigate(`/group/${session.id}`); }}
                style={{ minWidth: 0, borderRadius: 0, padding: 16 }}
              >
                <img
                  src={session.trainerImg}
                  alt={session.trainer}
                  className="w-[44px] h-[44px] rounded-full object-cover flex-shrink-0 border border-gray-200"
                />
                <div className="flex-1 min-w-0 ml-[12px]">
                  <div style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: 13, lineHeight: '131%', color: '#333333', fontWeight: 500 }} className="truncate">{selectedRoom}</div>
                  <div className={`inline-block px-2 py-0.5 text-xs rounded font-semibold mt-1 ${levelBg} ${levelText}`}>Level {session.level}</div>
                </div>
                <div style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: 13, lineHeight: '131%', color: '#595959', fontWeight: 500 }} className="ml-2 flex-shrink-0">
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

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="flex flex-row justify-between items-center gap-4" style={{ marginBottom: 16 }}>
        <h2 style={{ 
          fontFamily: 'Helvetica Neue, Arial, sans-serif', 
          fontSize: 24, 
          lineHeight: 'auto', 
          color: '#333333', 
          fontWeight: 500,
          margin: 0
        }}>Group Configurator</h2>
        <div className="relative w-auto">
          <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']}>
            <Button style={{ 
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              fontSize: 14,
              color: '#333333',
              borderColor: '#d9d9d9',
              borderRadius: 6,
              height: 32,
              padding: '4px 15px'
            }}>
              <Space>
                {selectedRoom}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </div>

      {/* Weekday Selector */}
      <div style={{
        background: '#ffffff',
        boxShadow: '0 8px 8px 0 rgba(0, 0, 0, 0.08)',
        borderRadius: '8px 8px 0 0',
        padding: '8px',
        position: 'sticky',
        top: 0,
        zIndex: 1
      }}>
        <div className="grid grid-cols-7 gap-2 overflow-x-auto">
          {weekdays.map((weekday) => {
            const selected = selectedWeekday === weekday;
            return (
              <button
                key={weekday}
                onClick={() => setSelectedWeekday(weekday)}
                style={{
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 0',
                  background: selected ? '#1677ff' : 'none',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'background 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className={
                  `flex flex-col items-center w-full focus:outline-none` +
                  (!selected ? ' hover:bg-[#f5f5f5]' : '')
                }
              >
                <span
                  style={{
                    fontFamily: 'Helvetica Neue, Arial, sans-serif',
                    fontSize: 14,
                    lineHeight: '19px',
                    fontWeight: 700,
                    color: selected ? '#fff' : '#333',
                    transition: 'color 0.2s',
                    textAlign: 'center'
                  }}
                >
                  {weekday.slice(0, 3)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Time Grid */}
      <div
        className="overflow-x-auto"
        style={{
          marginTop: -16,
          position: 'relative',
          zIndex: 0,
          paddingTop: 16,
          flex: 1,
          overflowY: 'auto',
          minHeight: 0
        }}
      >
        <div>
          {generateTimeSlots()}
        </div>
      </div>
    </div>
  )
}

export default GroupConfigurator 