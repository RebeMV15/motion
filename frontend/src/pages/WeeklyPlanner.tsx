import React from 'react'

const GroupConfigurator: React.FC = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const timeSlots = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Group Configurator</h2>
        <button className="btn btn-primary">
          Add Class
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="grid grid-cols-8 border-b">
          <div className="p-2 text-sm font-medium text-gray-500">Time</div>
          {days.map(day => (
            <div key={day} className="p-2 text-sm font-medium text-gray-500 border-l">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-8">
          {timeSlots.map(time => (
            <React.Fragment key={time}>
              <div className="p-2 text-sm text-gray-500 border-b">
                {time}
              </div>
              {days.map(day => (
                <div key={`${day}-${time}`} className="p-2 border-l border-b min-h-[60px]">
                  {/* Placeholder for class slots */}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GroupConfigurator 