'use client';

import { useState } from 'react';
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

// Mock data - in real app, fetch from Firestore
const mockApplications = [
  {
    id: '1',
    companyName: 'Google',
    roleTitle: 'Software Engineer',
    status: 'Applied',
    appliedDate: '2024-01-15',
    deadline: '2024-02-15',
    notes: 'Applied through company website. Waiting for response.',
    nextSteps: ['Prepare for technical interview', 'Review algorithms'],
  },
  {
    id: '2',
    companyName: 'McKinsey & Company',
    roleTitle: 'Management Consultant',
    status: 'Interview',
    appliedDate: '2024-01-10',
    deadline: '2024-01-30',
    notes: 'First round interview scheduled for next week.',
    nextSteps: ['Practice case studies', 'Research company'],
  },
  {
    id: '3',
    companyName: 'Goldman Sachs',
    roleTitle: 'Investment Banking Analyst',
    status: 'Offer',
    appliedDate: '2024-01-05',
    deadline: '2024-01-25',
    notes: 'Received offer! Need to respond within 2 weeks.',
    nextSteps: ['Review offer details', 'Negotiate if needed'],
  },
  {
    id: '4',
    companyName: 'Amazon',
    roleTitle: 'Product Manager',
    status: 'Rejected',
    appliedDate: '2024-01-01',
    deadline: '2024-01-20',
    notes: 'Rejected after final round. Good feedback received.',
    nextSteps: ['Apply to other PM roles', 'Improve interview skills'],
  },
];

const statuses = ['All', 'Applied', 'Interview', 'Offer', 'Rejected', 'Withdrawn'];
const statusColors = {
  Applied: 'bg-blue-100 text-blue-800',
  Interview: 'bg-yellow-100 text-yellow-800',
  Offer: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
  Withdrawn: 'bg-gray-100 text-gray-800',
};

export default function ApplicationTracker() {
  const [applications, setApplications] = useState(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newApplication, setNewApplication] = useState({
    companyName: '',
    roleTitle: '',
    status: 'Applied',
    appliedDate: '',
    deadline: '',
    notes: '',
  });

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.roleTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || app.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const addApplication = () => {
    if (newApplication.companyName && newApplication.roleTitle) {
      const app = {
        id: Date.now().toString(),
        ...newApplication,
        nextSteps: [],
      };
      setApplications([app, ...applications]);
      setNewApplication({
        companyName: '',
        roleTitle: '',
        status: 'Applied',
        appliedDate: '',
        deadline: '',
        notes: '',
      });
      setShowAddForm(false);
    }
  };

  const updateStatus = (id: string, newStatus: string) => {
    setApplications(apps =>
      apps.map(app =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const deleteApplication = (id: string) => {
    setApplications(apps => apps.filter(app => app.id !== id));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Applied':
        return <ClockIcon className="h-5 w-5" />;
      case 'Interview':
        return <ExclamationTriangleIcon className="h-5 w-5" />;
      case 'Offer':
        return <CheckCircleIcon className="h-5 w-5" />;
      case 'Rejected':
        return <XCircleIcon className="h-5 w-5" />;
      default:
        return <ClockIcon className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Application Tracker</h1>
          <p className="mt-2 text-lg text-gray-600">
            Monitor your job applications and track your progress
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          {['Applied', 'Interview', 'Offer', 'Rejected'].map(status => (
            <div key={status} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${statusColors[status as keyof typeof statusColors]}`}>
                  {getStatusIcon(status)}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">{status}</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {applications.filter(app => app.status === status).length}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search companies or roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <FunnelIcon className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add Application</span>
            </button>
          </div>
        </div>

        {/* Add Application Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Application</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Company Name"
                value={newApplication.companyName}
                onChange={(e) => setNewApplication(prev => ({ ...prev, companyName: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Role Title"
                value={newApplication.roleTitle}
                onChange={(e) => setNewApplication(prev => ({ ...prev, roleTitle: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newApplication.status}
                onChange={(e) => setNewApplication(prev => ({ ...prev, status: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.slice(1).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <input
                type="date"
                value={newApplication.appliedDate}
                onChange={(e) => setNewApplication(prev => ({ ...prev, appliedDate: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                placeholder="Deadline (optional)"
                value={newApplication.deadline}
                onChange={(e) => setNewApplication(prev => ({ ...prev, deadline: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Notes (optional)"
                value={newApplication.notes}
                onChange={(e) => setNewApplication(prev => ({ ...prev, notes: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={1}
              />
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addApplication}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Application
              </button>
            </div>
          </div>
        )}

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <div key={application.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{application.companyName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[application.status as keyof typeof statusColors]}`}>
                      {application.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{application.roleTitle}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                    </div>
                    {application.deadline && (
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>Deadline: {new Date(application.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {application.notes && (
                    <p className="text-gray-700 mb-3">{application.notes}</p>
                  )}

                  {application.nextSteps.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Next Steps:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {application.nextSteps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <select
                    value={application.status}
                    onChange={(e) => updateStatus(application.id, e.target.value)}
                    className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {statuses.slice(1).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => deleteApplication(application.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <XCircleIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {applications.length === 0 
                ? 'Start tracking your applications by adding your first one!'
                : 'Try adjusting your search or filter criteria.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
