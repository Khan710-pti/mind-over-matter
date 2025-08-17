'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BuildingOfficeIcon, 
  ClipboardDocumentListIcon, 
  BookOpenIcon, 
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();
  const [dailyTip, setDailyTip] = useState('');

  useEffect(() => {
    // Mock daily tip - in real app, fetch from Firestore
    setDailyTip('Practice case studies regularly - consistency beats intensity when preparing for consulting interviews.');
  }, []);

  const quickActions = [
    {
      title: 'Explore Industries',
      description: 'Discover different career paths and industries',
      href: '/industries',
      icon: BuildingOfficeIcon,
      color: 'bg-blue-500',
    },
    {
      title: 'Track Applications',
      description: 'Monitor your job applications and progress',
      href: '/application-tracker',
      icon: ClipboardDocumentListIcon,
      color: 'bg-green-500',
    },
    {
      title: 'Study Resources',
      description: 'Access curated learning materials and tools',
      href: '/resources',
      icon: BookOpenIcon,
      color: 'bg-purple-500',
    },
    {
      title: 'AI Career Guide',
      description: 'Get personalized career advice and guidance',
      href: '/chat',
      icon: ChatBubbleLeftRightIcon,
      color: 'bg-orange-500',
    },
  ];

  const stats = [
    { name: 'Industries Available', value: '10+' },
    { name: 'Career Roles', value: '35+' },
    { name: 'Study Resources', value: '100+' },
    { name: 'Expert Mentors', value: '25+' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back{user?.displayName ? `, ${user.displayName}` : ''}! 👋
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Ready to take control of your career? Let's explore opportunities together.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold text-lg">M</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div>
                  <span className={`inline-flex p-3 ${action.color} text-white rounded-lg`}>
                    <action.icon className="h-6 w-6" />
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {action.description}
                  </p>
                </div>
                <span
                  className="absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Daily Tip */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <LightBulbIcon className="h-8 w-8 text-yellow-300" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-white">💡 Daily Career Tip</h3>
              <p className="mt-2 text-blue-100">
                {dailyTip}
              </p>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        {!user?.displayName && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserGroupIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Complete Your Profile</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Tell us about your background to get personalized career recommendations.
                </p>
                <div className="mt-4">
                  <Link
                    href="/onboarding"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Start Onboarding
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
