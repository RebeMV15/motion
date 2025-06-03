import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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

const UserManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UserType>('trainer')
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

  const renderTrainersTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surname</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr><td colSpan={4} className="text-center py-4">Loading...</td></tr>
          ) : error ? (
            <tr><td colSpan={4} className="text-center py-4 text-red-500">{error}</td></tr>
          ) : trainers.length === 0 ? (
            <tr><td colSpan={4} className="text-center py-4">No trainers found.</td></tr>
          ) : (
            trainers.map((trainer) => (
              <tr
                key={trainer.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => navigate(`/users/${trainer.id}`)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{trainer.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{trainer.surname}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {trainer.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-primary-600 hover:text-primary-900"
                    onClick={e => { e.stopPropagation(); /* handle edit here */ }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )

  const renderClientsTable = () => (
    <>
      <div className="px-4 pb-4 pt-4 flex justify-start">
        <input
          type="text"
          placeholder="Search by name..."
          value={clientSearch}
          onChange={e => setClientSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring focus:border-primary-300"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surname</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={3} className="text-center py-4">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={3} className="text-center py-4 text-red-500">{error}</td></tr>
            ) : filteredClients.length === 0 ? (
              <tr><td colSpan={3} className="text-center py-4">No clients found.</td></tr>
            ) : (
              filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => navigate(`/clients/${client.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{client.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.surname}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-primary-600 hover:text-primary-900"
                      onClick={e => { e.stopPropagation(); /* handle edit here */ }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Manager</h2>
        <button className="btn btn-primary">
          Add {activeTab === 'trainer' ? 'Trainer' : 'Client'}
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('trainer')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'trainer'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Trainers
            </button>
            <button
              onClick={() => setActiveTab('client')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'client'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Clients
            </button>
          </nav>
        </div>

        {activeTab === 'trainer' && renderTrainersTable()}
        {activeTab === 'client' && renderClientsTable()}
      </div>
    </div>
  )
}

export default UserManager 