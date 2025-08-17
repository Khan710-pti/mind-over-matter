import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  message: string;
  navigation?: Array<{ label: string; path: string }>;
}

export async function chatWithAI(
  messages: ChatMessage[],
  context?: string
): Promise<ChatResponse> {
  try {
    const systemPrompt = `You are Mind Over Matter, a career guidance AI assistant for UK students. 
    
Your role is to:
1. Provide helpful career advice and guidance
2. Answer questions about industries, roles, and career paths
3. Suggest relevant resources and next steps
4. Help with navigation by providing structured links when appropriate

Context: ${context || 'General career guidance'}

When suggesting navigation, format your response with navigation links like this:
NAVIGATION: [{"label": "View Tech Roles", "path": "/industries/tech"}, {"label": "Application Tracker", "path": "/application-tracker"}]

Keep responses friendly, informative, and actionable. Focus on UK job market specifics.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content || 'Sorry, I encountered an error.';

    // Extract navigation links if present
    const navigationMatch = content.match(/NAVIGATION: (\[.*\])/);
    let navigation;
    
    if (navigationMatch) {
      try {
        navigation = JSON.parse(navigationMatch[1]);
      } catch (e) {
        console.error('Failed to parse navigation:', e);
      }
    }

    return {
      message: content.replace(/NAVIGATION: \[.*\]/, '').trim(),
      navigation
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    return {
      message: 'Sorry, I encountered an error. Please try again later.',
    };
  }
}

export async function generateCareerSummary(roleData: any): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a career expert. Generate a compelling 2-3 sentence summary of this role for UK students.'
        },
        {
          role: 'user',
          content: `Generate a career summary for: ${JSON.stringify(roleData)}`
        }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return response.choices[0]?.message?.content || 'Career summary not available.';
  } catch (error) {
    console.error('Error generating career summary:', error);
    return 'Career summary not available.';
  }
}
