import React from 'react';
import { X, BarChart3 } from 'lucide-react';

const Sidebar = ({ jobsData, sidebarOpen, setSidebarOpen }) => {
  const columnConfig = {
    applied: { 
      title: 'Applied', 
      lightColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-500',
      count: jobsData.applied.length 
    },
    interviewing: { 
      title: 'Interviewing', 
      lightColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      bgColor: 'bg-yellow-500',
      count: jobsData.interviewing.length 
    },
    offer: { 
      title: 'Offer', 
      lightColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      bgColor: 'bg-green-500',
      count: jobsData.offer.length 
    },
    rejected: { 
      title: 'Rejected', 
      lightColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      bgColor: 'bg-red-500',
      count: jobsData.rejected.length 
    }
  };

  const totalJobs = Object.values(jobsData).flat().length;

  return (
    <>
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Total Applications Card */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{totalJobs}</p>
                </div>
              </div>
            </div>

            {/* Status Breakdown */}
            <div className="space-y-2">
              {Object.entries(columnConfig).map(([key, config]) => (
                <div key={key} className={`p-3 rounded-lg ${config.lightColor} border ${config.borderColor}`}>
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${config.textColor} capitalize`}>
                      {config.title}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config.bgColor} text-white`}>
                      {config.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;