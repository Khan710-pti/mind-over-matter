'use client';

import { useState } from 'react';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  ExternalLinkIcon,
  UserGroupIcon,
  BookOpenIcon,
  PlayIcon,
  ComputerDesktopIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

// Mock data - in real app, fetch from Firestore
const mockResources = [
  {
    id: '1',
    name: 'CaseCoach - Case Interview Prep',
    url: 'https://casecoach.com',
    type: 'Practice',
    description: 'Comprehensive case interview preparation platform with practice cases and coaching',
    free: false,
    roleId: 'mc',
    tags: ['Consulting', 'Case Studies', 'Interview Prep']
  },
  {
    id: '2',
    name: 'SuperInterview AI',
    url: 'https://superinterview.ai',
    type: 'Tool',
    description: 'AI-powered interview practice with real-time feedback and scoring',
    free: true,
    roleId: 'general',
    tags: ['AI', 'Interview Prep', 'Practice']
  },
  {
    id: '3',
    name: 'Cracking the Coding Interview',
    url: 'https://amazon.com/cracking-coding-interview',
    type: 'Book',
    description: 'Essential book for technical interview preparation with 189 programming questions',
    free: false,
    roleId: 'swe',
    tags: ['Programming', 'Algorithms', 'Technical']
  },
  {
    id: '4',
    name: 'LeetCode',
    url: 'https://leetcode.com',
    type: 'Practice',
    description: 'Platform for practicing coding problems and preparing for technical interviews',
    free: true,
    roleId: 'swe',
    tags: ['Programming', 'Algorithms', 'Practice']
  },
  {
    id: '5',
    name: 'Leland - Consulting Prep',
    url: 'https://leland.com',
    type: 'Course',
    description: 'Structured courses for consulting interview preparation',
    free: false,
    roleId: 'mc',
    tags: ['Consulting', 'Case Studies', 'Courses']
  },
  {
    id: '6',
    name: 'Wall Street Prep',
    url: 'https://wallstreetprep.com',
    type: 'Course',
    description: 'Financial modeling and valuation courses for finance careers',
    free: false,
    roleId: 'ib',
    tags: ['Finance', 'Modeling', 'Valuation']
  },
  {
    id: '7',
    name: 'Product School',
    url: 'https://productschool.com',
    type: 'Course',
    description: 'Product management courses and certifications',
    free: false,
    roleId: 'pm',
    tags: ['Product Management', 'Courses', 'Certification']
  },
  {
    id: '8',
    name: 'DataCamp',
    url: 'https://datacamp.com',
    type: 'Course',
    description: 'Interactive data science and programming courses',
    free: false,
    roleId: 'ds',
    tags: ['Data Science', 'Programming', 'Courses']
  }
];

const mockMentors = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Senior Management Consultant',
    linkedin_url: 'https://linkedin.com/in/sarah-johnson',
    type: 'Paid',
    industry: 'Consulting',
    company: 'McKinsey & Company',
    bio: '5+ years experience in strategy consulting. Specializes in healthcare and technology sectors.',
    hourlyRate: 150
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Software Engineering Manager',
    linkedin_url: 'https://linkedin.com/in/michael-chen',
    type: 'Unpaid',
    industry: 'Technology',
    company: 'Google',
    bio: '10+ years in software engineering. Passionate about mentoring new developers.',
    hourlyRate: 0
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    title: 'Investment Banking Vice President',
    linkedin_url: 'https://linkedin.com/in/emma-rodriguez',
    type: 'Paid',
    industry: 'Finance',
    company: 'Goldman Sachs',
    bio: '8+ years in investment banking. Expert in M&A and capital markets.',
    hourlyRate: 200
  },
  {
    id: '4',
    name: 'David Thompson',
    title: 'Product Director',
    linkedin_url: 'https://linkedin.com/in/david-thompson',
    type: 'Volunteer',
    industry: 'Technology',
    company: 'Amazon',
    bio: '12+ years in product management. Loves helping students break into PM roles.',
    hourlyRate: 0
  }
];

const resourceTypes = ['All', 'Course', 'Book', 'Video', 'Practice', 'Tool'];
const mentorTypes = ['All', 'Paid', 'Unpaid', 'Volunteer'];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResourceType, setSelectedResourceType] = useState('All');
  const [selectedMentorType, setSelectedMentorType] = useState('All');
  const [activeTab, setActiveTab] = useState('resources');

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedResourceType === 'All' || resource.type === selectedResourceType;
    return matchesSearch && matchesType;
  });

  const filteredMentors = mockMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedMentorType === 'All' || mentor.type === selectedMentorType;
    return matchesSearch && matchesType;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'Course':
        return <AcademicCapIcon className="h-5 w-5" />;
      case 'Book':
        return <BookOpenIcon className="h-5 w-5" />;
      case 'Video':
        return <PlayIcon className="h-5 w-5" />;
      case 'Practice':
        return <ComputerDesktopIcon className="h-5 w-5" />;
      case 'Tool':
        return <ComputerDesktopIcon className="h-5 w-5" />;
      default:
        return <BookOpenIcon className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Resources & Mentors</h1>
          <p className="mt-2 text-lg text-gray-600">
            Access study materials, tools, and connect with industry experts
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'resources', name: 'Study Resources', count: mockResources.length },
                { id: 'mentors', name: 'Mentors', count: mockMentors.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs font-medium">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab === 'resources' ? 'resources, tools, or topics' : 'mentors or industries'}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FunnelIcon className="h-5 w-5 text-gray-400" />
                <select
                  value={activeTab === 'resources' ? selectedResourceType : selectedMentorType}
                  onChange={(e) => {
                    if (activeTab === 'resources') {
                      setSelectedResourceType(e.target.value);
                    } else {
                      setSelectedMentorType(e.target.value);
                    }
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {activeTab === 'resources' 
                    ? resourceTypes.map(type => (
                        <option key={type} value={type}>{type === 'All' ? 'All Types' : type}</option>
                      ))
                    : mentorTypes.map(type => (
                        <option key={type} value={type}>{type === 'All' ? 'All Types' : type}</option>
                      ))
                  }
                </select>
              </div>
            </div>

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <div key={resource.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2 rounded-lg bg-blue-100 text-blue-600`}>
                        {getResourceIcon(resource.type)}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        resource.free ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {resource.free ? 'Free' : 'Paid'}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{resource.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Visit Resource
                      <ExternalLinkIcon className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* Mentors Tab */}
            {activeTab === 'mentors' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMentors.map((mentor) => (
                  <div key={mentor.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 rounded-lg bg-green-100 text-green-600">
                        <UserGroupIcon className="h-5 w-5" />
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        mentor.type === 'Paid' ? 'bg-purple-100 text-purple-800' :
                        mentor.type === 'Unpaid' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {mentor.type}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{mentor.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{mentor.title}</p>
                    <p className="text-gray-500 text-sm mb-3">{mentor.company}</p>
                    
                    <p className="text-gray-700 text-sm mb-4">{mentor.bio}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {mentor.hourlyRate > 0 ? `£${mentor.hourlyRate}/hr` : 'Free'}
                      </span>
                      <a
                        href={mentor.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Connect
                        <ExternalLinkIcon className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {((activeTab === 'resources' && filteredResources.length === 0) ||
              (activeTab === 'mentors' && filteredMentors.length === 0)) && (
              <div className="text-center py-12">
                <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No {activeTab} found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
