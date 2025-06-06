import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, List, Avatar, Button, Tag, Typography, Space, Divider, Select } from 'antd';
import { ArrowLeftOutlined, UserOutlined, SaveOutlined, CloseOutlined, UserAddOutlined, FileOutlined } from '@ant-design/icons';
import sessionsData from '../data/sessions.json';
import groupTrainers from '../data/group_trainers.json';
import usersData from '../data/users.json';
import typeOfGroupsData from '../data/type_of_groups.json';
import groupAttendanceData from '../data/group_attendance.json';

const { Text } = Typography;

function getSessionById(id: string) {
  return sessionsData.sessions.find((s: any) => s.id === id);
}

function getTrainerByGroupId(groupId: number) {
  const trainersMap = groupTrainers.group_trainers as Record<string, string>;
  const trainerId = trainersMap[String(groupId)] || '001';
  return usersData.trainers.find((t: any) => t.id === trainerId);
}

function getTypeOfGroup(typeId: number) {
  return typeOfGroupsData.type_of_groups.find((t: any) => t.id === typeId);
}

function getAttendeesByGroupId(groupId: number) {
  const attendance = groupAttendanceData.group_attendance.filter((a: any) => a.group_id === groupId && a.client_id);
  return attendance.map((a: any) => {
    // client_id in attendance is number, but users.json uses string ids with leading zeros
    const clientId = a.client_id.toString().padStart(5, '0');
    return usersData.clients.find((c: any) => c.id === clientId);
  }).filter(Boolean);
}

const containerStyle: React.CSSProperties = {
  width: '100%',
  margin: '0 auto',
  maxWidth: 400,
  boxSizing: 'border-box',
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

const SessionDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTrainer, setSelectedTrainer] = React.useState<string>('');

  // Remove top and bottom padding from the parent wrapper only on this page
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

  // Set initial trainer value
  useEffect(() => {
    if (trainer) {
      setSelectedTrainer(trainer.id);
    }
  }, [trainer]);

  // Date and time formatting
  const dateObj = new Date(session.date);
  const dateStr = dateObj.toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: '2-digit', year: '2-digit' });
  const startHour = session.time.split(':')[0];
  const endHour = (parseInt(startHour) + 1).toString().padStart(2, '0');
  const scheduleStr = `${startHour.padStart(2, '0')} - ${endHour} h`;

  return (
    <>
      <style>{mobileStyle}</style>
      <div className="session-detail-container" style={containerStyle}>
        {/* Title and Back Arrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, marginBottom: 16 }}>
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginLeft: -8, marginRight: 0, padding: 0 }} />
          <span style={{ fontWeight: 600, fontSize: 18 }}>Details session</span>
        </div>

        {/* Session Info Card */}
        <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16, padding: 0 }} bodyStyle={{ padding: '12px 16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
              <div style={{ width: '50%' }}>
                <Text type="secondary">Date</Text>
                <div>{dateStr}</div>
              </div>
              <div style={{ width: '50%' }}>
                <Text type="secondary">Schedule</Text>
                <div>{scheduleStr}</div>
              </div>
            </div>
            <Divider style={{ margin: 0 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
              <div style={{ width: '50%' }}>
                <Text type="secondary">Room</Text>
                <div>{session.room.name}</div>
              </div>
              <div style={{ width: '50%' }}>
                <Text type="secondary">Level</Text>
                <div style={{ fontWeight: 600 }}>Level {session.group.level}</div>
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
                options={usersData.trainers.map((t: any) => ({
                  value: t.id,
                  label: (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Avatar src={`/avatars/trainer-${t.id}.jpg`} size={32} style={{ margin: '8px 0' }} />
                      <span>{`${t.name} ${t.surname}`}</span>
                    </div>
                  )
                }))}
              />
            </div>
            <Divider style={{ margin: 0 }} />
            <div style={{ padding: '12px 0' }}>
              <Text type="secondary">Type of group</Text>
              <div>{typeOfGroup?.type_of_group || 'Unknown'}</div>
            </div>
          </div>
        </Card>

        {/* Attendees Title */}
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
            <span>Attendees</span>
            <Tag color="blue">{attendees.length}/{session.group.capacity}</Tag>
          </div>
          <Button
            type="text"
            icon={<UserAddOutlined style={{ fontSize: 24, color: '#333333' }} />}
            style={{ marginLeft: 'auto' }}
          />
        </div>

        {/* Attendees List Card */}
        <Card
          bordered={false}
          style={{ borderRadius: 12, marginBottom: 16, padding: 0 }}
          bodyStyle={{ padding: '12px 16px' }}
        >
          <List
            itemLayout="horizontal"
            dataSource={attendees}
            renderItem={(item: any) => (
              <List.Item
                actions={[
                  <Button icon={<FileOutlined />} size="small" type="text" />,
                  <Button icon={<CloseOutlined />} size="small" type="text" danger />
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

        {/* Buttons */}
        <Space style={{ width: '100%', justifyContent: 'flex-end', marginBottom: 16 }}>
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="primary" icon={<SaveOutlined />}>Save</Button>
        </Space>
      </div>
    </>
  );
};

export default SessionDetail; 