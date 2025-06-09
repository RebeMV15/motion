import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Input, Button, Select, Avatar, Typography, Row, Col, Divider } from 'antd';
import usersData from '../data/users.json';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';

const { Text } = Typography;

const roleOptions = [
  { label: 'Admin', value: 'Admin' },
  { label: 'Basic', value: 'Basic' },
];

const containerStyle: React.CSSProperties = {
  width: '100%',
  margin: '0 auto',
  maxWidth: 1280,
  boxSizing: 'border-box',
  padding: '0 16px',
};

const TrainerDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const trainer = usersData.trainers.find((t: any) => t.id === id);

  // Fallback for demo: if not found, use first trainer
  const initial = trainer || usersData.trainers[0];

  const [form, setForm] = useState({
    name: initial.name,
    surname: initial.surname,
    role: initial.role,
    email: initial.email,
    picture: `/avatars/trainer-${initial.id}.jpg`,
  });

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const parent = document.querySelector('.trainer-detail-container')?.parentElement;
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
    <div className="trainer-detail-container" style={containerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, marginBottom: 16 }}>
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginLeft: -8, marginRight: 0, padding: 0 }} />
        <span style={{ fontWeight: 600, fontSize: 18 }}>Trainer details</span>
      </div>
      <Card bordered={false} style={{ borderRadius: 12, padding: 0 }} bodyStyle={{ padding: '12px 16px' }}>
        {/* Line 1: Picture and Picture URL */}
        <Row gutter={16} align="middle" style={{ marginBottom: 16 }}>
          <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar src={form.picture} size={64} />
          </Col>
          <Col span={16} style={{ display: 'flex', alignItems: 'center' }}>
            <Input
              value={form.picture}
              onChange={e => handleChange('picture', e.target.value)}
              size="small"
              style={{ width: '100%' }}
            />
          </Col>
        </Row>
        <Divider style={{ margin: '12px 0' }} />
        {/* Line 2: Name, Surname */}
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Text type="secondary">Name</Text>
            <Input value={form.name} onChange={e => handleChange('name', e.target.value)} />
          </Col>
          <Col span={12}>
            <Text type="secondary">Surname</Text>
            <Input value={form.surname} onChange={e => handleChange('surname', e.target.value)} />
          </Col>
        </Row>
        <Divider style={{ margin: '12px 0' }} />
        {/* Line 3: Role (full line) */}
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={24}>
            <Text type="secondary">Role</Text>
            <Select
              style={{ width: '100%', marginTop: 4 }}
              value={form.role}
              onChange={v => handleChange('role', v)}
              options={roleOptions}
            />
          </Col>
        </Row>
        <Divider style={{ margin: '12px 0' }} />
        {/* Line 4: Email */}
        <Row gutter={16}>
          <Col span={24}>
            <Text type="secondary">Email</Text>
            <Input value={form.email} onChange={e => handleChange('email', e.target.value)} />
          </Col>
        </Row>
      </Card>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
        <Button onClick={() => navigate(-1)} style={{ marginRight: 8 }}>Cancel</Button>
        <Button type="primary" icon={<SaveOutlined />}>Save</Button>
      </div>
    </div>
  );
};

export default TrainerDetail; 