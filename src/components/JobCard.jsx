import React from 'react';
import { Building, User, Calendar, Trash2 } from 'lucide-react';

const JobCard = ({ job, columnKey, config, deleteJob }) => {
  const handleDragStart = (e) => {
    const dragData = {
      job,
      sourceColumn: columnKey
    };
    
    e.dataTransfer.setData('text/plain', JSON.stringify(dragData));
    e.dataTransfer.effectAllowed = 'move';
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent any parent event handlers
    deleteJob(job.id, columnKey);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-4 cursor-move hover:shadow-md transition-all duration-200 hover:scale-102 group"
    >
      {/* Company and Delete Button */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <Building className={`h-4 w-4 ${config.textColor}`} />
          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {job.companyName}
          </h4>
        </div>
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all duration-200 p-1 rounded-md hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      
      {/* Role */}
      <div className="flex items-center space-x-2 mb-2">
        <User className="h-4 w-4 text-gray-500" />
        <p className="text-sm text-gray-700 font-medium">{job.role}</p>
      </div>
      
      {/* Date Applied */}
      <div className="flex items-center space-x-2">
        <Calendar className="h-4 w-4 text-gray-500" />
        <p className="text-xs text-gray-500">
          Applied: {formatDate(job.dateApplied)}
        </p>
      </div>

      {/* Status Badge */}
      <div className="mt-3 flex justify-end">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color} text-white`}>
          {config.title}
        </span>
      </div>
    </div>
  );
};

export default JobCard;