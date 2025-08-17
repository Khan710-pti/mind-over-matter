'use client';

import { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, LightBulbIcon, BookOpenIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { chatWithAI, ChatMessage } from '@/lib/ai/chat';

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m your AI career guide. I can help you with:\n\n• Exploring different industries and roles\n• Understanding career requirements and timelines\n• Finding relevant resources and mentors\n• Preparing for interviews and applications\n• Answering any career-related questions\n\nWhat would you like to know about today?',
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputValue.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await chatWithAI([...messages, userMessage]);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.message,
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Handle navigation suggestions if present
      if (response.navigation && response.navigation.length > 0) {
        const navigationMessage: ChatMessage = {
          role: 'assistant',
          content: 'Here are some helpful links to explore:',
        };
        setMessages(prev => [...prev, navigationMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again later.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    'What are the best industries for Computer Science graduates?',
    'How do I prepare for consulting case interviews?',
    'What skills do I need for a Product Manager role?',
    'Tell me about investment banking careers in the UK',
    'How can I find mentors in the tech industry?',
    'What\'s the typical salary range for entry-level roles?',
  ];

  const suggestedTopics = [
    {
      title: 'Industry Exploration',
      description: 'Learn about different career paths',
      icon: BuildingOfficeIcon,
      questions: [
        'What industries are growing fastest in the UK?',
        'Which industries offer the best work-life balance?',
        'What are the entry requirements for consulting?'
      ]
    },
    {
      title: 'Interview Preparation',
      description: 'Get ready for your interviews',
      icon: BookOpenIcon,
      questions: [
        'How should I prepare for technical interviews?',
        'What are common case study frameworks?',
        'How do I answer behavioral questions?'
      ]
    },
    {
      title: 'Career Planning',
      description: 'Plan your career trajectory',
      icon: LightBulbIcon,
      questions: [
        'What\'s the typical career progression in finance?',
        'How do I transition from engineering to product management?',
        'What certifications should I pursue?'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">AI Career Guide</h1>
          <p className="mt-2 text-lg text-gray-600">
            Your personal AI assistant for career guidance and advice
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Chat with AI Career Guide</h2>
                <p className="text-sm text-gray-500">Ask me anything about careers, industries, or job hunting</p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSubmit} className="flex space-x-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about careers, roles, industries, or anything else..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Questions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Questions</h3>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(question)}
                    className="w-full text-left p-3 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Suggested Topics */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Explore Topics</h3>
              <div className="space-y-4">
                {suggestedTopics.map((topic, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <topic.icon className="h-5 w-5 text-blue-600 mr-2" />
                      <h4 className="font-medium text-gray-900">{topic.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{topic.description}</p>
                    <div className="space-y-1">
                      {topic.questions.map((q, qIndex) => (
                        <button
                          key={qIndex}
                          onClick={() => setInputValue(q)}
                          className="block w-full text-left text-xs text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-3">💡 Pro Tips</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Be specific about your background and goals</li>
                <li>• Ask follow-up questions for detailed advice</li>
                <li>• Use the chat to explore different career paths</li>
                <li>• Ask about salary ranges and requirements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
