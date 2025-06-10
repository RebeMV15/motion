import React from 'react';
import GroupCard from './GroupCard';

interface Group {
  id: number;
  name: string;
}

interface GroupListProps {
  groups: Group[];
  className?: string;
}

const GroupList: React.FC<GroupListProps> = ({ groups, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {groups.map((group) => (
        <GroupCard
          key={group.id}
          groupId={group.id}
          groupName={group.name}
        />
      ))}
    </div>
  );
};

export default GroupList; 