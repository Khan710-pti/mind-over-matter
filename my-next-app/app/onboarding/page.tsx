'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { OnboardingData } from '@/lib/types';

const steps = [
  { id: 1, name: 'Basic Info', description: 'Your background and education' },
  { id: 2, name: 'Skills & Interests', description: 'What you\'re good at and enjoy' },
  { id: 3, name: 'Career Goals', description: 'Where you want to go' },
  { id: 4, name: 'Recommendations', description: 'Your personalized career path' },
];

const degrees = [
  'Computer Science',
  'Engineering',
  'Business/Management',
  'Economics',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Psychology',
  'Other',
];

const skills = [
  'Problem Solving',
  'Data Analysis',
  'Programming',
  'Communication',
  'Leadership',
  'Project Management',
  'Research',
  'Creative Thinking',
  'Teamwork',
  'Financial Modeling',
  'Marketing',
  'Sales',
];

const interests = [
  'Technology',
  'Finance',
  'Healthcare',
  'Consulting',
  'Marketing',
  'Operations',
  'Research',
  'Education',
  'Government',
  'Non-profit',
];

export default function Onboarding() {
  const router = useRouter();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    degree: '',
    skills: [],
    visaNeeds: false,
    interests: [],
    locationPreference: 'UK',
  });
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const handleInputChange = (field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateRecommendations = () => {
    // Mock recommendations based on user input
    const mockRecommendations = [
      {
        industry: { name: 'Technology', summary: 'Fast-growing sector with high demand for technical skills' },
        role: { title: 'Software Engineer', difficulty: 'Medium', salaryRange: '£35k - £80k' },
        score: 85,
        reasoning: 'Strong match based on your Computer Science degree and programming skills',
      },
      {
        industry: { name: 'Consulting', summary: 'Strategic problem-solving for businesses' },
        role: { title: 'Management Consultant', difficulty: 'Hard', salaryRange: '£45k - £90k' },
        score: 78,
        reasoning: 'Good fit given your problem-solving skills and business interests',
      },
      {
        industry: { name: 'Finance', summary: 'Quantitative analysis and financial services' },
        role: { title: 'Data Analyst', difficulty: 'Medium', salaryRange: '£30k - £65k' },
        score: 72,
        reasoning: 'Matches your analytical skills and interest in data',
      },
    ];
    setRecommendations(mockRecommendations);
  };

  const completeOnboarding = () => {
    // In real app, save to Firestore
    router.push('/dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's your degree or field of study?
              </label>
              <select
                value={formData.degree}
                onChange={(e) => handleInputChange('degree', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select your degree</option>
                {degrees.map(degree => (
                  <option key={degree} value={degree}>{degree}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you need visa sponsorship to work in the UK?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="visaNeeds"
                    value="true"
                    checked={formData.visaNeeds === true}
                    onChange={() => handleInputChange('visaNeeds', true)}
                    className="mr-2"
                  />
                  Yes, I need sponsorship
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="visaNeeds"
                    value="false"
                    checked={formData.visaNeeds === false}
                    onChange={() => handleInputChange('visaNeeds', false)}
                    className="mr-2"
                  />
                  No, I have the right to work
                </label>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select your top skills (choose 3-5):
              </label>
              <div className="grid grid-cols-2 gap-3">
                {skills.map(skill => (
                  <label key={skill} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                      className="mr-2"
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What industries interest you? (choose 2-4):
              </label>
              <div className="grid grid-cols-2 gap-3">
                {interests.map(interest => (
                  <label key={interest} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestToggle(interest)}
                      className="mr-2"
                    />
                    {interest}
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Where would you like to work?
              </label>
              <select
                value={formData.locationPreference}
                onChange={(e) => handleInputChange('locationPreference', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="UK">United Kingdom</option>
                <option value="London">London</option>
                <option value="Manchester">Manchester</option>
                <option value="Birmingham">Birmingham</option>
                <option value="Edinburgh">Edinburgh</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Ready for recommendations?</h4>
              <p className="text-blue-700 text-sm">
                Based on your profile, we'll generate personalized career suggestions tailored to your background and goals.
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {recommendations.length === 0 ? (
              <div className="text-center">
                <button
                  onClick={generateRecommendations}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Generate Recommendations
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">
                        {rec.role.title} in {rec.industry.name}
                      </h4>
                      <span className="text-sm font-medium text-blue-600">
                        {rec.score}% Match
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{rec.industry.summary}</p>
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span>Difficulty: {rec.role.difficulty}</span>
                      <span>Salary: {rec.role.salaryRange}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">{rec.reasoning}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        <nav aria-label="Progress" className="mb-8">
          <ol className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} flex-1`}>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className={`h-0.5 w-full ${step.id <= currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
                </div>
                <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                  step.id <= currentStep ? 'bg-blue-600' : 'bg-white border-2 border-gray-300'
                }`}>
                  <span className={`text-sm font-medium ${
                    step.id <= currentStep ? 'text-white' : 'text-gray-500'
                  }`}>
                    {step.id}
                  </span>
                </div>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                  <span className={`text-xs font-medium ${
                    step.id <= currentStep ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </nav>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep - 1].name}
            </h2>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </div>

          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={completeOnboarding}
                className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                Complete Onboarding
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
