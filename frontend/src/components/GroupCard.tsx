import React from 'react';
import groupTrainers from '../data/group_trainers.json';

interface GroupTrainers {
  group_trainers: {
    [key: string]: string;
  };
}

interface GroupCardProps {
  groupId: number;
  groupName: string;
  className?: string;
}

const GroupCard: React.FC<GroupCardProps> = ({ groupId, groupName, className = '' }) => {
  // Get trainer ID from the mapping
  const trainerId = (groupTrainers as GroupTrainers).group_trainers[groupId.toString()];
  
  // Determine if trainer is male or female
  const isMaleTrainer = trainerId === "001" || trainerId === "002" || trainerId === "003";
  
  // Get avatar image path based on trainer ID
  const avatarPath = `/avatars/trainer-${trainerId}.jpg`;

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            src={avatarPath}
            alt={`Trainer ${trainerId}`}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{groupName}</h3>
          <p className="text-sm text-gray-500">Group ID: {groupId}</p>
          <p className="text-sm text-gray-500">
            Trainer: {isMaleTrainer ? `Male Trainer ${trainerId}` : 'Female Trainer'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupCard; 