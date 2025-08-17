import React from 'react';
import { Search, Plus, Menu, Briefcase } from 'lucide-react';

const Header = ({ 
  searchTerm, 
  setSearchTerm, 
  setIsFormOpen, 
  setSidebarOpen, 
  sidebarOpen 
}) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-400 rounded-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Job Tracker
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative md:block hidden">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 w-64"
              />
            </div>
            
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center space-x-2 bg-green-500 cursor-pointer text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">Add Job</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;