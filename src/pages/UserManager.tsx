import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'
import { List, Typography, Button, Avatar } from 'antd'
import userData from '../data/users.json'

type UserType = 'trainer' | 'client'

interface User {
  id: string
  name: string
  surname: string
  role: string
}

interface Client {
  id: string
  name: string
  surname: string
}

const mockAvatars = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/65.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/men/12.jpg',
]

const { Text } = Typography;

const UserManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UserType>('client')
  const [trainers, setTrainers] = useState<User[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [clientSearch, setClientSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setError(null)
    setLoading(true)
    try {
      if (activeTab === 'trainer') {
        setTrainers(userData.trainers)
      } else if (activeTab === 'client') {
        setClients(userData.clients)
      }
      setLoading(false)
    } catch (err) {
      setError('Error loading data')
      setLoading(false)
    }
  }, [activeTab])

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(clientSearch.toLowerCase())
  )

  const sortedTrainers = trainers.slice().sort((a, b) => {
    const nameA = `${a.name} ${a.surname}`.toLowerCase();
    const nameB = `${b.name} ${b.surname}`.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  const sortedFilteredClients = filteredClients.slice().sort((a, b) => {
    const nameA = `${a.name} ${a.surname}`.toLowerCase();
    const nameB = `${b.name} ${b.surname}`.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  const renderTrainersList = () => (
    <List
      itemLayout="horizontal"
      dataSource={sortedTrainers}
      renderItem={trainer => (
        <List.Item
          style={{ cursor: 'pointer', paddingLeft: 16, paddingRight: 0 }}
          onClick={() => navigate(`/trainer/${trainer.id}`)}
          actions={[
            <Button
              type="text"
              icon={<EditOutlined style={{ fontSize: 18 }} />}
              onClick={e => {
                e.stopPropagation();
                // You can implement edit navigation here if needed
              }}
              key="edit"
            />
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={`/avatars/trainer-${trainer.id}.jpg`} size={32} />}
            title={<span style={{ fontWeight: 500 }}>{trainer.name} {trainer.surname}</span>}
            description={<Text type="secondary">{trainer.role}</Text>}
          />
        </List.Item>
      )}
    />
  )

  const renderClientsList = () => (
    <>
      <div className="px-4 pb-4 pt-4 flex justify-start">
        <input
          type="text"
          placeholder="Search by name..."
          value={clientSearch}
          onChange={e => setClientSearch(e.target.value)}
          className="w-full sm:w-64 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-primary-300"
        />
      </div>
      <List
        itemLayout="horizontal"
        dataSource={sortedFilteredClients}
        renderItem={client => (
          <List.Item
            style={{ cursor: 'pointer', paddingLeft: 16, paddingRight: 0 }}
            onClick={() => navigate(`/client/${client.id.padStart(5, '0')}`)}
            actions={[
              <Button
                type="text"
                icon={<EditOutlined style={{ fontSize: 18 }} />}
                onClick={e => {
                  e.stopPropagation();
                  navigate(`/clients/${client.id}/edit`);
                }}
                key="edit"
              />
            ]}
          >
            <List.Item.Meta
              title={<span style={{ fontWeight: 500 }}>{client.name} {client.surname}</span>}
            />
          </List.Item>
        )}
      />
    </>
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">User Manager</h2>
        <button className="w-full sm:w-auto btn btn-primary">
          Add {activeTab === 'trainer' ? 'Trainer' : 'Client'}
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('client')}
              className={`py-4 px-4 sm:px-6 text-sm font-medium ${
                activeTab === 'client'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Clients
            </button>
            <button
              onClick={() => setActiveTab('trainer')}
              className={`py-4 px-4 sm:px-6 text-sm font-medium ${
                activeTab === 'trainer'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Trainers
            </button>
          </nav>
        </div>

        {activeTab === 'trainer' && renderTrainersList()}
        {activeTab === 'client' && renderClientsList()}
      </div>
    </div>
  )
}

export default UserManager 