import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, List, Avatar, Button, Tag, Typography, Space, Divider, Select, Modal, Input } from 'antd';
import { ArrowLeftOutlined, SaveOutlined, UserAddOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons';
import sessionsData from '../data/sessions.json';
import groupTrainers from '../data/group_trainers.json';
import usersData from '../data/users.json';
import typeOfGroupsData from '../data/type_of_groups.json';
import groupAttendanceData from '../data/group_attendance.json';

const { Text } = Typography;

export interface Session {
  id: string;
  date: string;
  time: string;
  weekday: string;
  room: {
    name: string;
  };
  group: {
    id: number;
    level: number;
    type_of_group: number;
    capacity: number;
    trainer?: string;
    attendees?: string[];
  };
  [key: string]: any;
}

interface Trainer {
  id: string;
  name: string;
  surname: string;
}

interface Client {
  id: string;
  name: string;
  surname: string;
  file: string;
  description?: string;
}

interface TypeOfGroup {
  id: number;
  type_of_group: string;
}

interface RoomOption {
  id: number;
  name: string;
}

interface SessionDetailProps {
  sessions: Session[];
  updateSession: (sessionId: string, updates: Partial<Session>) => void;
}

function getSessionById(id: string): Session | undefined {
  return sessionsData.sessions.find((s: Session) => s.id === id);
}

function getTrainerByGroupId(groupId: number): Trainer | undefined {
  const trainersMap = groupTrainers.group_trainers as Record<string, string>;
  const trainerId = trainersMap[String(groupId)] || '001';
  return usersData.trainers.find((t: Trainer) => t.id === trainerId);
}

function getTypeOfGroup(typeId: number): TypeOfGroup | undefined {
  return typeOfGroupsData.type_of_groups.find((t: TypeOfGroup) => t.id === typeId);
}

function getAttendeesByGroupId(groupId: number): Client[] {
  const attendance = groupAttendanceData.group_attendance.filter((a: any) => a.group_id === groupId && a.client_id);
  return attendance.map((a: any) => {
    const clientId = a.client_id.toString().padStart(5, '0');
    return usersData.clients.find((c: Client) => c.id === clientId);
  }).filter(Boolean) as Client[];
}

const containerStyle: React.CSSProperties = {
  width: '100%',
  margin: '0 auto',
  maxWidth: 1280,
  boxSizing: 'border-box',
  padding: '0 16px',
};

const mobileStyle = `
@media (max-width: 600px) {
  .session-detail-container {
    max-width: 100% !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding-left: 8px !important;
    padding-right: 8px !important;
    width: 100% !important;
  }
}
`;

const GroupSessionDetail: React.FC<SessionDetailProps> = ({ sessions, updateSession }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTrainer, setSelectedTrainer] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [selectedTypeOfGroup, setSelectedTypeOfGroup] = useState<number>(1);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [localAttendees, setLocalAttendees] = useState<Client[]>([]);
  const [initialAttendeesLoaded, setInitialAttendeesLoaded] = useState<boolean>(false);

  useEffect(() => {
    const parent = document.querySelector('.session-detail-container')?.parentElement;
    if (parent) {
      const prevPaddingTop = parent.style.paddingTop;
      const prevPaddingBottom = parent.style.paddingBottom;
      parent.style.paddingTop = '0px';
      parent.style.paddingBottom = '0px';
      return () => {
        parent.style.paddingTop = prevPaddingTop;
        parent.style.paddingBottom = prevPaddingBottom;
      };
    }
  }, []);

  if (!id) return <div>Session not found</div>;

  const session = getSessionById(id);
  if (!session) return <div>Session not found</div>;

  const trainer = getTrainerByGroupId(session.group.id);
  const typeOfGroup = getTypeOfGroup(session.group.type_of_group);
  const attendees = getAttendeesByGroupId(session.group.id);

  // Set initial values
  useEffect(() => {
    if (trainer) setSelectedTrainer(trainer.id);
    setSelectedRoom(session.room.name);
    setSelectedLevel(session.group.level);
    setSelectedTypeOfGroup(session.group.type_of_group);
  }, [trainer, session]);

  useEffect(() => {
    if (!initialAttendeesLoaded && attendees.length > 0) {
      const sortedAttendees = [...attendees].sort((a: any, b: any) => {
        const nameA = `${a.name} ${a.surname}`.toLowerCase();
        const nameB = `${b.name} ${b.surname}`.toLowerCase();
        return nameA.localeCompare(nameB);
      });
      setLocalAttendees(sortedAttendees);
      setInitialAttendeesLoaded(true);
    }
  }, [attendees, initialAttendeesLoaded]);

  // Filter clients based on search text
  const filteredClients = usersData.clients
    .filter((client: any) => {
      const fullName = `${client.name} ${client.surname}`.toLowerCase();
      return fullName.includes(searchText.toLowerCase());
    })
    .sort((a: any, b: any) => {
      const nameA = `${a.name} ${a.surname}`.toLowerCase();
      const nameB = `${b.name} ${b.surname}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });

  const handleAddAttendee = (): void => {
    if (selectedClient) {
      const isAlreadyAttending = localAttendees.some(attendee => attendee.id === selectedClient.id);
      if (!isAlreadyAttending) {
        const newAttendees = [...localAttendees, selectedClient].sort((a: Client, b: Client) => {
          const nameA = `${a.name} ${a.surname}`.toLowerCase();
          const nameB = `${b.name} ${b.surname}`.toLowerCase();
          return nameA.localeCompare(nameB);
        });
        setLocalAttendees(newAttendees);
      }
      setSelectedClient(null);
      setSearchText('');
      setIsModalVisible(false);
    }
  };

  // Date and time formatting
  const weekdayStr = session.weekday || new Date(session.date).toLocaleDateString('en-US', { weekday: 'long' });
  const startHour = session.time.split(':')[0];
  const endHour = (parseInt(startHour) + 1).toString().padStart(2, '0');
  const scheduleStr = `${startHour.padStart(2, '0')} - ${endHour} h`;

  const handleSave = (): void => {
    updateSession(session.id, {
      room: { ...session.room, name: selectedRoom },
      group: {
        ...session.group,
        level: selectedLevel,
        type_of_group: selectedTypeOfGroup,
        trainer: selectedTrainer,
        attendees: localAttendees.map(a => a.id),
      },
    });
    navigate('/weekly');
  };

  // Room, Level, and Type of Group options
  const roomOptions = [
    ...new Set(sessionsData.sessions.map((s: Session) => s.room.name))
  ].map((name, idx) => ({ label: name, value: name }));
  const levelOptions = [1, 2, 3].map(lvl => ({ label: `Level ${lvl}`, value: lvl }));
  const typeOfGroupOrder = ['Single training', 'Group of 5', 'Group of 8', 'Learning'];
  const typeOfGroupOptions = typeOfGroupsData.type_of_groups
    .slice()
    .sort((a: any, b: any) => typeOfGroupOrder.indexOf(a.type_of_group) - typeOfGroupOrder.indexOf(b.type_of_group))
    .map((t: any) => ({ label: t.type_of_group, value: t.id, capacity: t.capacity }));

  // Get the selected type of group capacity
  const selectedTypeOfGroupObj = typeOfGroupsData.type_of_groups.find((t: any) => t.id === selectedTypeOfGroup);
  const selectedTypeOfGroupCapacity = selectedTypeOfGroupObj ? selectedTypeOfGroupObj.capacity : session.group.capacity;

  return (
    <>
      <style>{mobileStyle}</style>
      <div className="session-detail-container" style={containerStyle}>
        {/* Title and Back Arrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, marginBottom: 16 }}>
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginLeft: -8, marginRight: 0, padding: 0 }} />
          <span style={{ fontWeight: 600, fontSize: 18 }}>Details group</span>
        </div>

        {/* Session Info Card */}
        <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16, padding: 0 }} bodyStyle={{ padding: '12px 16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', gap: 24 }}>
              <div style={{ flex: 1 }}>
                <Text type="secondary">Weekday</Text>
                <div>{weekdayStr}</div>
              </div>
              <div style={{ flex: 1 }}>
                <Text type="secondary">Schedule</Text>
                <div>{scheduleStr}</div>
              </div>
            </div>
            <Divider style={{ margin: 0 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', gap: 24 }}>
              <div style={{ flex: 1 }}>
                <Text type="secondary">Room</Text>
                <Select
                  style={{ width: '100%', marginTop: 4 }}
                  value={selectedRoom}
                  onChange={setSelectedRoom}
                  options={roomOptions}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Text type="secondary">Level</Text>
                <Select
                  style={{ width: '100%', marginTop: 4 }}
                  value={selectedLevel}
                  onChange={setSelectedLevel}
                  options={levelOptions}
                />
              </div>
            </div>
            <Divider style={{ margin: 0 }} />
            <div style={{ padding: '12px 0' }}>
              <Text type="secondary">Trainer</Text>
              <Select
                style={{ width: '100%', marginTop: 4 }}
                value={selectedTrainer}
                onChange={setSelectedTrainer}
                optionLabelProp="label"
                options={usersData.trainers
                  .slice()
                  .sort((a: any, b: any) => {
                    const nameA = `${a.name} ${a.surname}`.toLowerCase();
                    const nameB = `${b.name} ${b.surname}`.toLowerCase();
                    return nameA.localeCompare(nameB);
                  })
                  .map((t: any) => ({
                    value: t.id,
                    label: (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Avatar src={`/avatars/trainer-${t.id}.jpg`} size={24} style={{ margin: '8px 0' }} />
                        <span>{`${t.name} ${t.surname}`}</span>
                      </div>
                    )
                  }))}
              />
            </div>
            <Divider style={{ margin: 0 }} />
            <div style={{ padding: '12px 0' }}>
              <Text type="secondary">Type of group</Text>
              <Select
                style={{ width: '100%', marginTop: 4 }}
                value={selectedTypeOfGroup}
                onChange={setSelectedTypeOfGroup}
                options={typeOfGroupOptions}
              />
            </div>
          </div>
        </Card>

        {/* Members Title */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8, 
          marginTop: 24,
          marginBottom: 8,
          fontFamily: 'Helvetica Neue',
          fontSize: 15,
          lineHeight: '20px',
          fontWeight: 400,
          color: '#666666',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>Members</span>
            <Tag color="blue">{localAttendees.length}/{selectedTypeOfGroupCapacity}</Tag>
          </div>
          <Button
            type="text"
            icon={<UserAddOutlined style={{ fontSize: 24, color: '#333333' }} />}
            style={{ marginLeft: 'auto' }}
            onClick={() => setIsModalVisible(true)}
          />
        </div>

        {/* Members List Card */}
        <Card
          bordered={false}
          style={{ borderRadius: 12, marginBottom: 16, padding: 0 }}
          bodyStyle={{ padding: '12px 16px' }}
        >
          <List
            itemLayout="horizontal"
            dataSource={localAttendees}
            renderItem={(item: any) => (
              <List.Item
                onClick={() => navigate(`/client/${item.id}`)}
                style={{ cursor: 'pointer' }}
                actions={[
                  <RightOutlined style={{ fontSize: 16, color: '#bfbfbf' }} />
                ]}
              >
                <List.Item.Meta
                  title={<span>{item.name} {item.surname}</span>}
                  description={<span style={{ color: '#8c8c8c', fontSize: 12 }}>{item.file}</span>}
                />
              </List.Item>
            )}
          />
        </Card>

        {/* Add Member Modal */}
        <Modal
          title="Add Member"
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setSearchText('');
            setSelectedClient(null);
          }}
          footer={[
            <Button key="cancel" onClick={() => {
              setIsModalVisible(false);
              setSearchText('');
              setSelectedClient(null);
            }}>
              Cancel
            </Button>,
            <Button 
              key="add" 
              type="primary" 
              onClick={handleAddAttendee}
              disabled={!selectedClient}
            >
              Add member
            </Button>
          ]}
          width={400}
        >
          <Input
            placeholder="Search clients..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <List
            itemLayout="horizontal"
            dataSource={filteredClients}
            style={{ maxHeight: 400, overflow: 'auto' }}
            renderItem={(item: any) => (
              <List.Item
                onClick={() => setSelectedClient(item)}
                style={{ 
                  cursor: 'pointer',
                  backgroundColor: selectedClient?.id === item.id ? '#f0f0f0' : 'transparent',
                  borderRadius: 4,
                  padding: '8px 12px'
                }}
              >
                <List.Item.Meta
                  title={`${item.name} ${item.surname}`}
                  description={<span style={{ color: '#8c8c8c', fontSize: 12 }}>{item.file}</span>}
                />
              </List.Item>
            )}
          />
        </Modal>

        {/* Buttons */}
        <Space style={{ width: '100%', justifyContent: 'flex-end', marginBottom: 16 }}>
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
          >
            Save
          </Button>
        </Space>
      </div>
    </>
  );
};

export default GroupSessionDetail; 