import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Board from './components/Board';
import JobForm from './components/JobForm';

const App = () => {
  const [jobsData, setJobsData] = useState({
    applied: [],
    interviewing: [],
    offer: [],
    rejected: [],
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load saved jobs from localStorage
  useEffect(() => {
    const storedJobs = localStorage.getItem('jobsData');
    if (storedJobs) {
      try {
        setJobsData(JSON.parse(storedJobs));
      } catch (error) {
        console.error('Error loading jobs from localStorage:', error);
      }
    }
  }, []);

  // Save jobs to localStorage whenever jobsData changes
  useEffect(() => {
    localStorage.setItem('jobsData', JSON.stringify(jobsData));
  }, [jobsData]);

  const generateId = () => {
    return 'job-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  };

  const addJob = (job) => {
    const newJob = { ...job, id: generateId() };
    setJobsData(prev => ({
      ...prev,
      [job.status]: [...prev[job.status], newJob]
    }));
    setIsFormOpen(false);
  };

  const deleteJob = (jobId, status) => {
    setJobsData(prev => ({
      ...prev,
      [status]: prev[status].filter(job => job.id !== jobId)
    }));
  };

  const moveJob = (job, sourceColumn, targetColumn) => {
    if (sourceColumn === targetColumn) return;

    // Remove from source column
    const updatedSource = jobsData[sourceColumn].filter(j => j.id !== job.id);
    
    // Add to target column with updated status
    const updatedJob = { ...job, status: targetColumn };
    const updatedTarget = [...jobsData[targetColumn], updatedJob];

    setJobsData(prev => ({
      ...prev,
      [sourceColumn]: updatedSource,
      [targetColumn]: updatedTarget
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setIsFormOpen={setIsFormOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />

      <div className="flex">
        <Sidebar 
          jobsData={jobsData}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <Board
          jobsData={jobsData}
          searchTerm={searchTerm}
          deleteJob={deleteJob}
          moveJob={moveJob}
          sidebarOpen={sidebarOpen}
        />
      </div>

      {isFormOpen && (
        <JobForm 
          isFormOpen={isFormOpen}
          setIsFormOpen={setIsFormOpen}
          addJob={addJob}
        />
      )}
    </div>
  );
};

export default App;