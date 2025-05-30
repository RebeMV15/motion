import React from 'react'

const DailySchedule: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Daily Schedule</h2>
        <button className="btn btn-primary">
          Add Session
        </button>
      </div>
      
      <div className="bg-white shadow rounded-lg p-4">
        <div className="grid grid-cols-1 gap-4">
          {/* Placeholder for schedule items */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Morning Yoga</h3>
                <p className="text-sm text-gray-500">7:00 AM - 8:00 AM</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                Available
              </span>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600">Trainer: John Doe</p>
              <p className="text-sm text-gray-600">Room: Studio 1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailySchedule 