import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Input, Button, Switch, DatePicker, Typography, Space, Select, Row, Col, Divider, Tag, List } from 'antd';
import usersData from '../data/users.json';
import dayjs from 'dayjs';
import { ArrowLeftOutlined, SaveOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';

interface GroupSlot {
  weekday: string;
  slot: string;
}

interface Client {
  id: string;
  name: string;
  surname: string;
  phone?: string;
  email?: string;
  file?: string;
  billable?: boolean;
  start_date?: string;
  end_date?: string | null;
  groups?: GroupSlot[];
  description?: string;
}

const { Text } = Typography;

const weekdays = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

// Generate hourly slots from 08:00 - 09:00 h to 22:00 - 23:00 h
const slots = Array.from({ length: 15 }, (_, i) => {
  const start = (8 + i).toString().padStart(2, '0') + ':00';
  const end = (9 + i).toString().padStart(2, '0') + ':00';
  return `${start} - ${end} h`;
});

const containerStyle: React.CSSProperties = {
  width: '100%',
  margin: '0 auto',
  maxWidth: 1280,
  boxSizing: 'border-box',
  padding: '0 16px',
};

const mobileStyle = `
@media (max-width: 600px) {
  .member-detail-container {
    max-width: 100% !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding-left: 8px !important;
    padding-right: 8px !important;
    width: 100% !important;
  }
}
`;

const ClientDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const client: Client | undefined = usersData.clients.find((c: Client) => c.id === id);

  // Fallback for demo: if not found, use first client
  const initial: Client = client || usersData.clients[0];

  const [form, setForm] = useState({
    name: initial.name,
    surname: initial.surname,
    phone: initial.phone || '',
    email: initial.email || '',
    startDate: initial.start_date || '01/06/2025',
    endDate: initial.end_date || '',
    billable: initial.billable !== false,
    groups: initial.groups || [
      { weekday: 'Monday', slot: '10:00 - 11:00 h' },
      { weekday: 'Wednesday', slot: '16:00 - 17:00 h' },
    ],
    notes: initial.description || '',
  });

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleGroupChange = (idx: number, field: string, value: any) => {
    setForm(prev => ({
      ...prev,
      groups: prev.groups.map((g: GroupSlot, i: number) => i === idx ? { ...g, [field]: value } : g)
    }));
  };

  const handleAddGroup = () => {
    setForm(prev => ({
      ...prev,
      groups: [...prev.groups, { weekday: 'Monday', slot: '08:00 - 09:00 h' }]
    }));
  };

  const handleRemoveGroup = (idx: number) => {
    setForm(prev => ({
      ...prev,
      groups: prev.groups.filter((_, i: number) => i !== idx)
    }));
  };

  useEffect(() => {
    const parent = document.querySelector('.member-detail-container')?.parentElement;
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

  return (
    <>
      <style>{mobileStyle}</style>
      <div className="member-detail-container" style={containerStyle}>
        {/* Title and Back Arrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, marginBottom: 16 }}>
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginLeft: -8, marginRight: 0, padding: 0 }} />
          <span style={{ fontWeight: 600, fontSize: 18 }}>Client details</span>
        </div>

        {/* Member Info Card */}
        <Card bordered={false} style={{ borderRadius: 12, marginBottom: 16, padding: 0 }} bodyStyle={{ padding: '12px 16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', gap: 24 }}>
              <div style={{ flex: 1 }}>
                <Text type="secondary">Name</Text>
                <Input value={form.name} onChange={e => handleChange('name', e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <Text type="secondary">Surname</Text>
                <Input value={form.surname} onChange={e => handleChange('surname', e.target.value)} />
              </div>
            </div>
            <Divider style={{ margin: 0 }} />
            <div style={{ padding: '12px 0' }}>
              <Text type="secondary">Phone</Text>
              <Input value={form.phone} onChange={e => handleChange('phone', e.target.value)} />
            </div>
            <Divider style={{ margin: 0 }} />
            <div style={{ padding: '12px 0' }}>
              <Text type="secondary">E-Mail</Text>
              <Input value={form.email} onChange={e => handleChange('email', e.target.value)} />
            </div>
            <Divider style={{ margin: 0 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', gap: 24 }}>
              <div style={{ flex: 1 }}>
                <Text type="secondary">Start date</Text>
                <DatePicker
                  value={form.startDate ? dayjs(form.startDate, 'DD/MM/YYYY') : undefined}
                  format="DD/MM/YYYY"
                  onChange={(_, dateStr) => handleChange('startDate', dateStr)}
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Text type="secondary">End date</Text>
                <DatePicker
                  value={form.endDate ? dayjs(form.endDate, 'DD/MM/YYYY') : undefined}
                  format="DD/MM/YYYY"
                  onChange={(_, dateStr) => handleChange('endDate', dateStr)}
                  style={{ width: '100%' }}
                  placeholder="Not defined"
                />
              </div>
            </div>
            <Divider style={{ margin: 0 }} />
            <div style={{ padding: '12px 0' }}>
              <Text type="secondary">Billing</Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <span>{form.billable ? 'Billable' : 'Not billable'}</span>
                <Switch checked={form.billable} onChange={v => handleChange('billable', v)} />
              </div>
            </div>
          </div>
        </Card>

        {/* Groups Title */}
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
          <span>Groups</span>
          <Button
            type="text"
            icon={<PlusOutlined style={{ fontSize: 24, color: '#333333' }} />}
            style={{ marginLeft: 'auto' }}
            onClick={handleAddGroup}
          />
        </div>

        {/* Groups List Card */}
        <Card
          bordered={false}
          style={{ borderRadius: 12, marginBottom: 16, padding: 0 }}
          bodyStyle={{ padding: '12px 16px' }}
        >
          {form.groups.map((group: GroupSlot, idx: number) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                marginBottom: 16,
              }}
            >
              <Select
                value={group.weekday}
                onChange={v => handleGroupChange(idx, 'weekday', v)}
                options={weekdays.map(w => ({ label: w, value: w }))}
                style={{ flex: 1, minWidth: 0 }}
              />
              <Select
                value={group.slot}
                onChange={v => handleGroupChange(idx, 'slot', v)}
                options={slots.map(s => ({ label: s, value: s }))}
                style={{ flex: 1, minWidth: 0 }}
              />
              <Button
                icon={<CloseOutlined />}
                size="small"
                type="text"
                danger
                onClick={() => handleRemoveGroup(idx)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 32 }}
                aria-label="Remove group"
              />
            </div>
          ))}
        </Card>

        {/* Notes */}
        <div style={{ fontWeight: 400, color: '#666', fontSize: 15, marginBottom: 8, marginTop: 16 }}>Notes</div>
        <Card style={{ borderRadius: 12, marginBottom: 16, padding: 0 }} bodyStyle={{ padding: '12px 16px' }}>
          <Input.TextArea
            value={form.notes}
            onChange={e => handleChange('notes', e.target.value)}
            rows={4}
            placeholder="Add notes, medical history, etc."
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

export default ClientDetail; 