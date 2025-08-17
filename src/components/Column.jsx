import React, { useState } from 'react';
import JobCard from './JobCard';
import { Briefcase } from 'lucide-react';

const Column = ({ columnKey, config, jobs, deleteJob, moveJob, searchTerm }) => {
  const [draggedOver, setDraggedOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDraggedOver(true);
  };

  const handleDragLeave = (e) => {
    // Only clear draggedOver if we're actually leaving the drop zone
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDraggedOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDraggedOver(false);
    
    const dragData = e.dataTransfer.getData('text/plain');
    if (!dragData) return;

    try {
      const { job, sourceColumn } = JSON.parse(dragData);
      moveJob(job, sourceColumn, columnKey);
    } catch (error) {
      console.error('Error parsing drag data:', error);
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-200 ${
        draggedOver 
          ? `${config.borderColor} bg-gradient-to-b from-white to-${config.lightColor}` 
          : 'border-gray-200'
      }`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className={`p-4 ${config.color} rounded-t-xl`}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white capitalize">
            {config.title}
          </h3>
          <span className="bg-white bg-opacity-20 text-black px-2.5 py-1 rounded-full text-sm font-medium">
            {jobs.length}
          </span>
        </div>
      </div>

      {/* Column Content */}
      <div className="p-4 space-y-3 min-h-[400px]">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            columnKey={columnKey}
            config={config}
            deleteJob={deleteJob}
          />
        ))}

        {jobs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Briefcase className="h-12 w-12 mb-3" />
            <p className="text-sm font-medium">No jobs found</p>
            {searchTerm && (
              <p className="text-xs mt-1">Try adjusting your search</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;