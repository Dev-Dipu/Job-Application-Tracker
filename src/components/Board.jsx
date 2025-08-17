import React from 'react';
import Column from './Column';

const Board = ({ jobsData, searchTerm, deleteJob, moveJob }) => {
  const columnConfig = {
    applied: { 
      title: 'Applied', 
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700'
    },
    interviewing: { 
      title: 'Interviewing', 
      color: 'bg-yellow-500',
      lightColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700'
    },
    offer: { 
      title: 'Offer', 
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700'
    },
    rejected: { 
      title: 'Rejected', 
      color: 'bg-red-500',
      lightColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700'
    }
  };

  const filteredJobs = (jobs) => {
    if (!searchTerm) return jobs;
    return jobs.filter(job => 
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="flex-1 lg:ml-0">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(columnConfig).map(([columnKey, config]) => (
            <Column
              key={columnKey}
              columnKey={columnKey}
              config={config}
              jobs={filteredJobs(jobsData[columnKey])}
              deleteJob={deleteJob}
              moveJob={moveJob}
              searchTerm={searchTerm}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;