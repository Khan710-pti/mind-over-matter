export interface Industry {
  id: string;
  name: string;
  summary: string;
  icon?: string;
  color?: string;
}

export interface Role {
  id: string;
  industryId: string;
  title: string;
  dailyWork: string;
  salaryRangeUK: {
    min: number;
    max: number;
    currency: 'GBP';
  };
  sponsorship: boolean;
  growth: string;
  companies: Array<{
    name: string;
    logo?: string;
    website?: string;
  }>;
  difficulty: {
    level: 'Easy' | 'Medium' | 'Hard';
    description: string;
  };
  timeline: {
    applicationStart: string;
    interviewPeriod: string;
    offerTimeline: string;
  };
  skillsTested: string[];
  requirements: string[];
}

export interface Resource {
  id: string;
  roleId: string;
  name: string;
  url: string;
  type: 'Course' | 'Book' | 'Video' | 'Practice' | 'Tool';
  description?: string;
  free: boolean;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  linkedin_url: string;
  type: 'Paid' | 'Unpaid' | 'Volunteer';
  industry: string;
  company?: string;
  bio?: string;
  hourlyRate?: number;
}

export interface DailyTip {
  id: string;
  tip: string;
  category: string;
  date: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  degree?: string;
  skills?: string[];
  visaNeeds?: boolean;
  interests?: string[];
  locationPreference?: string;
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Application {
  id: string;
  userId: string;
  roleId: string;
  companyName: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected' | 'Withdrawn';
  appliedDate: Date;
  deadline?: Date;
  notes?: string;
  nextSteps?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OnboardingData {
  degree: string;
  skills: string[];
  visaNeeds: boolean;
  interests: string[];
  locationPreference: string;
  personalityType?: string;
  careerGoals?: string[];
}

export interface Recommendation {
  industry: Industry;
  role: Role;
  score: number;
  reasoning: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  navigation?: Array<{ label: string; path: string }>;
}
