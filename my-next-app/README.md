# Mind Over Matter - AI-Powered Career Guidance Platform

A production-grade SaaS web application designed to help UK students navigate their career paths with AI-powered guidance, industry insights, and personalized recommendations.

## 🚀 Features

### Core Functionality
- **AI-Powered Career Guidance**: GPT-4 integration for personalized career advice
- **Industry Exploration**: Comprehensive database of industries and roles
- **Personalized Onboarding**: Multi-step questionnaire with career recommendations
- **Application Tracking**: Monitor job applications and progress
- **Resource Hub**: Curated study materials, tools, and mentor connections
- **Interactive Chat**: AI chatbot for career Q&A and navigation

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Firebase integration for live data
- **Data Synchronization**: Weekly Airtable sync via Vercel Cron
- **Authentication**: Firebase Auth with user management
- **Performance**: Next.js 15 with App Router and TypeScript

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Firebase (Auth + Firestore)
- **AI**: OpenAI GPT-4.1
- **Data Source**: Airtable + Firestore
- **Deployment**: Vercel
- **Authentication**: Firebase Auth
- **Styling**: Tailwind CSS + Headless UI

## 📁 Project Structure

```
my-next-app/
├── app/                          # Next.js App Router
│   ├── api/                     # API routes
│   │   └── airtable/           # Airtable sync endpoint
│   ├── chat/                    # AI chat page
│   ├── dashboard/               # Main dashboard
│   ├── industries/              # Industry exploration
│   ├── onboarding/              # User onboarding flow
│   ├── application-tracker/     # Job application tracking
│   └── resources/               # Study resources & mentors
├── components/                   # Reusable components
│   ├── Sidebar.tsx             # Navigation sidebar
│   ├── ChatWidget.tsx          # Floating chat widget
│   └── AuthProvider.tsx        # Authentication context
├── lib/                         # Utility libraries
│   ├── firebase.ts             # Firebase configuration
│   ├── types.ts                # TypeScript interfaces
│   └── ai/                     # AI integration
│       └── chat.ts             # OpenAI chat wrapper
├── firestore.rules             # Firestore security rules
├── vercel.json                 # Vercel configuration
└── env.example                 # Environment variables template
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project
- OpenAI API key
- Airtable account

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd my-next-app
npm install
```

### 2. Environment Setup
Copy `env.example` to `.env.local` and fill in your credentials:

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Airtable Configuration
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_airtable_base_id_here

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here

# Firebase Admin (for server-side operations)
FIREBASE_ADMIN_PROJECT_ID=your_project_id_here
FIREBASE_ADMIN_PRIVATE_KEY=your_private_key_here
FIREBASE_ADMIN_CLIENT_EMAIL=your_client_email_here
```

### 3. Firebase Setup
1. Create a new Firebase project
2. Enable Authentication and Firestore
3. Add your web app and copy configuration
4. Deploy Firestore security rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

### 4. Airtable Setup
Create tables with the following schema:
- **Industries**: id, name, summary, icon, color
- **Roles**: id, industryId, title, dailyWork, salaryRangeUK, sponsorship, growth, companies, difficulty, timeline, skillsTested, requirements
- **Resources**: id, roleId, name, url, type, description, free
- **Mentors**: id, name, title, linkedin_url, type, industry, company, bio, hourlyRate
- **DailyTips**: id, tip, category, date

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your app.

## 🚀 Deployment

### Vercel Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables in Vercel
Set all environment variables from your `.env.local` file in the Vercel project settings.

### Cron Job Setup
The app includes a weekly Airtable sync via Vercel Cron:
- **Schedule**: Every Monday at 2:00 AM UTC
- **Endpoint**: `/api/airtable/sync`
- **Function**: Syncs Airtable data to Firestore

## 🔐 Security

### Firestore Rules
- Public read access for industries, roles, mentors, resources, and daily tips
- User-specific data is protected and only accessible by the authenticated user
- Admin operations are restricted to server-side functions

### Authentication
- Firebase Authentication with anonymous sign-in for demo purposes
- User data isolation and protection
- Secure API endpoints with proper validation

## 📊 Data Flow

1. **Airtable** → Source of truth for career data
2. **Vercel Cron** → Weekly sync to Firestore
3. **Firestore** → Real-time data for the application
4. **OpenAI API** → AI-powered career guidance
5. **User Input** → Personalized recommendations and tracking

## 🎯 Key Features Explained

### AI Career Guidance
- GPT-4 integration for natural language career advice
- Context-aware responses based on user profile
- Navigation suggestions with structured links

### Onboarding Flow
- Multi-step questionnaire (degree, skills, interests, location)
- Personality assessment and career goals
- AI-generated career recommendations with scoring

### Application Tracking
- Add, edit, and track job applications
- Status management (Applied, Interview, Offer, Rejected)
- Progress monitoring and next steps

### Resource Hub
- Curated study materials and tools
- Mentor connections (paid/unpaid/volunteer)
- Industry-specific resources and certifications

## 🧪 Testing

### Manual Testing
1. **Onboarding Flow**: Complete the multi-step questionnaire
2. **AI Chat**: Test various career-related questions
3. **Application Tracking**: Add and manage job applications
4. **Resource Discovery**: Explore different industries and roles

### API Testing
Test the Airtable sync endpoint:
```bash
curl -X POST https://your-domain.vercel.app/api/airtable/sync \
  -H "Authorization: Bearer your_cron_secret"
```

## 🔧 Customization

### Adding New Industries
1. Add to Airtable Industries table
2. Include relevant roles and resources
3. Data will sync automatically via cron job

### Customizing AI Responses
Modify the system prompt in `lib/ai/chat.ts` to adjust AI behavior and tone.

### Styling Changes
Use Tailwind CSS classes and modify the design system in the components.

## 📈 Performance

- **Next.js 15**: Latest features and optimizations
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **Firebase**: Real-time database with offline support
- **Vercel**: Edge deployment and global CDN

## 🚨 Troubleshooting

### Common Issues
1. **Firebase Connection**: Check environment variables and project configuration
2. **OpenAI API**: Verify API key and rate limits
3. **Airtable Sync**: Ensure API key and base ID are correct
4. **Build Errors**: Check TypeScript compilation and dependencies

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` in your environment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the troubleshooting section
- Review Firebase and Vercel documentation
- Open an issue on GitHub

## 🎉 Acknowledgments

- Next.js team for the amazing framework
- Firebase for backend services
- OpenAI for AI capabilities
- Tailwind CSS for styling
- Vercel for deployment platform

---

**Built with ❤️ for UK students navigating their career journeys**
