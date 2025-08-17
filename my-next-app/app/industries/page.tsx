'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BuildingOfficeIcon, 
  ChevronRightIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

// Mock data - in real app, fetch from Firestore
const mockIndustries = [
  {
    id: 'tech',
    name: 'Technology',
    summary: 'Fast-growing sector driving innovation across all industries',
    icon: '💻',
    color: 'bg-blue-500',
    roles: [
      { id: 'swe', title: 'Software Engineer', difficulty: 'Medium', salary: '£35k - £80k' },
      { id: 'ds', title: 'Data Scientist', difficulty: 'Hard', salary: '£40k - £90k' },
      { id: 'pm', title: 'Product Manager', difficulty: 'Hard', salary: '£45k - £100k' },
      { id: 'ops', title: 'DevOps Engineer', difficulty: 'Medium', salary: '£40k - £85k' },
    ]
  },
  {
    id: 'consulting',
    name: 'Consulting',
    summary: 'Strategic problem-solving for businesses across industries',
    icon: '📊',
    color: 'bg-green-500',
    roles: [
      { id: 'mc', title: 'Management Consultant', difficulty: 'Hard', salary: '£45k - £90k' },
      { id: 'tc', title: 'Tech Consultant', difficulty: 'Medium', salary: '£40k - £85k' },
      { id: 'pe', title: 'PE Analyst', difficulty: 'Hard', salary: '£50k - £100k' },
      { id: 'sa', title: 'Strategy Analyst', difficulty: 'Medium', salary: '£35k - £75k' },
    ]
  },
  {
    id: 'finance',
    name: 'Finance',
    summary: 'Quantitative analysis and financial services',
    icon: '💰',
    color: 'bg-yellow-500',
    roles: [
      { id: 'ib', title: 'Investment Banker', difficulty: 'Hard', salary: '£50k - £120k' },
      { id: 'pe', title: 'Private Equity', difficulty: 'Hard', salary: '£60k - £150k' },
      { id: 'fm', title: 'Financial Manager', difficulty: 'Medium', salary: '£40k - £80k' },
      { id: 'ra', title: 'Risk Analyst', difficulty: 'Medium', salary: '£35k - £70k' },
    ]
  },
  {
    id: 'fmcg',
    name: 'FMCG',
    summary: 'Fast-moving consumer goods and retail',
    icon: '🛍️',
    color: 'bg-purple-500',
    roles: [
      { id: 'bm', title: 'Brand Manager', difficulty: 'Medium', salary: '£35k - £70k' },
      { id: 'sm', title: 'Sales Manager', difficulty: 'Medium', salary: '£30k - £65k' },
      { id: 'om', title: 'Operations Manager', difficulty: 'Medium', salary: '£35k - £75k' },
      { id: 'mm', title: 'Marketing Manager', difficulty: 'Medium', salary: '£30k - £70k' },
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    summary: 'Medical technology and healthcare services',
    icon: '🏥',
    color: 'bg-red-500',
    roles: [
      { id: 'hm', title: 'Healthcare Manager', difficulty: 'Medium', salary: '£35k - £75k' },
      { id: 'pm', title: 'Pharma Manager', difficulty: 'Medium', salary: '£40k - £80k' },
      { id: 'bm', title: 'Biotech Manager', difficulty: 'Hard', salary: '£45k - £90k' },
      { id: 'cm', title: 'Clinical Manager', difficulty: 'Medium', salary: '£35k - £70k' },
    ]
  },
];

export default function Industries() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [industries, setIndustries] = useState(mockIndustries);

  const filteredIndustries = industries.filter(industry => {
    const matchesSearch = industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         industry.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedDifficulty && selectedDifficulty !== 'all') {
      const hasMatchingRoles = industry.roles.some(role => role.difficulty === selectedDifficulty);
      return matchesSearch && hasMatchingRoles;
    }
    
    return matchesSearch;
  });

  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Explore Industries</h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover different career paths and find the perfect role for you
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search industries or roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'All Difficulties' : difficulty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredIndustries.map((industry) => (
            <div key={industry.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Industry Header */}
              <div className={`${industry.color} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{industry.icon}</span>
                    <div>
                      <h2 className="text-xl font-bold">{industry.name}</h2>
                      <p className="text-blue-100 text-sm">{industry.summary}</p>
                    </div>
                  </div>
                  <Link
                    href={`/industries/${industry.id}`}
                    className="text-blue-100 hover:text-white transition-colors"
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </Link>
                </div>
              </div>

              {/* Roles List */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Roles</h3>
                <div className="space-y-3">
                  {industry.roles.map((role) => (
                    <div key={role.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <h4 className="font-medium text-gray-900">{role.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            role.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            role.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {role.difficulty}
                          </span>
                          <span>{role.salary}</span>
                        </div>
                      </div>
                      <Link
                        href={`/roles/${role.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Learn More →
                      </Link>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Link
                    href={`/industries/${industry.id}`}
                    className="w-full text-center block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Explore {industry.name} Careers
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredIndustries.length === 0 && (
          <div className="text-center py-12">
            <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No industries found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
