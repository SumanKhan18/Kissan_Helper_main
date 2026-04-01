'use client';

import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { getFarmingAdvice } from '@/lib/gemini';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatInterfaceProps {
  className?: string;
  maxHeight?: string;
}

interface QuickQuestionEvent extends CustomEvent {
  detail: string;
}

export default function ChatInterface({ className = '', maxHeight = 'h-96' }: ChatInterfaceProps): React.ReactElement {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll down whenever new messages come
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load initial data (welcome message + localStorage history)
  useEffect(() => {
    const saved = localStorage.getItem('chatMessages');
    if (saved) {
      const parsed: Message[] = JSON.parse(saved);
      setMessages(parsed.map(m => ({ ...m, timestamp: new Date(m.timestamp) })));
    } else {
      const welcomeMessage: Message = {
        id: crypto.randomUUID(),
        text: "Hello! I'm your farming assistant powered by AI. Ask me anything about crops, livestock, weather, or farming techniques. I'm here to help you succeed on your farm!",
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }

    const handleQuickQuestion = (event: Event): void => {
      const customEvent = event as QuickQuestionEvent;
      setInputText(customEvent.detail);
    };

    window.addEventListener('quickQuestion', handleQuickQuestion);
    return (): void => {
      window.removeEventListener('quickQuestion', handleQuickQuestion);
    };
  }, []);

  // Persist chat in localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const createMessage = (text: string, sender: 'user' | 'assistant'): Message => ({
    id: `${crypto.randomUUID()}-${sender}`,
    text,
    sender,
    timestamp: new Date()
  });

  const handleSendMessage = async (): Promise<void> => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = createMessage(inputText, 'user');
    const currentQuestion: string = inputText;
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response: string = await getFarmingAdvice(currentQuestion);
      const assistantMessage: Message = createMessage(response, 'assistant');
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: unknown) {
      console.error('Error getting farming advice:', error);
      
      const errorMessage: Message = createMessage(
        "I'm sorry, I'm having trouble getting you an answer right now. Please try asking your question again.",
        'assistant'
      );
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp: Date): string => {
    return timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  const getMessageClasses = (sender: 'user' | 'assistant'): string => {
    return `max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
      sender === 'user'
        ? 'bg-green-600 text-white'
        : 'bg-gray-100 text-gray-900'
    }`;
  };

  const getTimestampClasses = (sender: 'user' | 'assistant'): string => {
    return `text-xs mt-1 ${
      sender === 'user' ? 'text-green-100' : 'text-gray-500'
    }`;
  };

  return (
    <div className={`flex flex-col ${maxHeight} ${className}`}>
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message: Message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={getMessageClasses(message.sender)}>
              <div className="flex items-start space-x-2">
                {message.sender === 'assistant' && (
                  <div className="w-6 h-6 flex items-center justify-center mt-1">
                    <i className="ri-robot-line text-green-600" aria-label="AI Assistant"></i>
                  </div>
                )}
                <div className="flex-1">
                  <p className="whitespace-pre-line">{message.text}</p>
                  <p className={getTimestampClasses(message.sender)}>
                    {formatTimestamp(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-robot-line text-green-600" aria-label="AI Assistant thinking"></i>
                </div>
                <div className="flex space-x-1" role="status" aria-label="Loading">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div 
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div 
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask about crops, livestock, weather, or any farming topic..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isLoading}
            autoFocus
            aria-label="Enter your farming question"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputText.trim()}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-send-plane-line" aria-hidden="true"></i>
            </div>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line • Powered by Google Gemini AI
        </p>
      </div>
    </div>
  );
}
