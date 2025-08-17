'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { chatWithAI, ChatMessage } from '@/lib/ai/chat';
import Link from 'next/link';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m your AI career guide. How can I help you today?',
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

      // Handle navigation suggestions
      if (response.navigation && response.navigation.length > 0) {
        const navigationMessage: ChatMessage = {
          role: 'assistant',
          content: 'Here are some helpful links:',
        };
        setMessages(prev => [...prev, navigationMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = (path: string) => {
    // Close chat and navigate
    setIsOpen(false);
    // You can use Next.js router here if needed
  };

  return (
    <>
      {/* Floating chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40 flex items-center justify-center"
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6" />
      </button>

      {/* Chat modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
          
          <div className="relative w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Career Guide</h3>
                <p className="text-sm text-gray-500">Ask me anything about careers!</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {/* Navigation suggestions */}
              {messages.length > 1 && messages[messages.length - 1].role === 'assistant' && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 px-3 py-2 rounded-lg">
                    <p className="text-sm mb-2">Quick actions:</p>
                    <div className="space-y-1">
                      <Link
                        href="/industries"
                        className="block text-blue-600 hover:text-blue-800 text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        🏢 Explore Industries
                      </Link>
                      <Link
                        href="/application-tracker"
                        className="block text-blue-600 hover:text-blue-800 text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        📋 Track Applications
                      </Link>
                      <Link
                        href="/resources"
                        className="block text-blue-600 hover:text-blue-800 text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        📚 Study Resources
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 px-3 py-2 rounded-lg">
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

            {/* Input form */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about careers, roles, or industries..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <PaperAirplaneIcon className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
